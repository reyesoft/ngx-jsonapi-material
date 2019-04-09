import {LEFT_ARROW} from '@angular/cdk/keycodes';
import {dispatchFakeEvent, dispatchKeyboardEvent} from '@angular/cdk/testing';
import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {JamSlide, JamSlideGroup, JamSlideHeaderPosition, JamSlidesModule} from './index';


describe('JamSlideGroup', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [JamSlidesModule, CommonModule, NoopAnimationsModule],
      declarations: [
        SimpleTabsTestApp,
        SimpleDynamicTabsTestApp,
        BindedTabsTestApp,
        AsyncTabsTestApp,
        DisabledTabsTestApp,
        TabGroupWithSimpleApi,
        TemplateTabs,
        TabGroupWithAriaInputs,
        TabGroupWithIsActiveBinding,
      ],
    });

    TestBed.compileComponents();
  }));

  describe('basic behavior', () => {
    let fixture: ComponentFixture<SimpleTabsTestApp>;
    let element: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabsTestApp);
      element = fixture.nativeElement;
    });

    it('should default to the first slide', () => {
      checkSelectedIndex(1, fixture);
    });

    it('will properly load content on first change detection pass', () => {
      fixture.detectChanges();
      expect(element.querySelectorAll('.jam-slide-body')[1].querySelectorAll('span').length).toBe(3);
    });

    it('should change selected index on click', () => {
      let component = fixture.debugElement.componentInstance;
      component.selectedIndex = 0;
      checkSelectedIndex(0, fixture);

      // select the second slide
      let slideElement = fixture.debugElement.queryAll(By.css('.jam-slide-element'))[1];
      slideElement.nativeElement.click();
      checkSelectedIndex(1, fixture);

      // select the third slide
      slideElement = fixture.debugElement.queryAll(By.css('.jam-slide-element'))[2];
      slideElement.nativeElement.click();
      checkSelectedIndex(2, fixture);
    });

    it('should support two-way binding for selectedIndex', fakeAsync(() => {
      let component = fixture.componentInstance;
      component.selectedIndex = 0;

      fixture.detectChanges();

      let slideElement = fixture.debugElement.queryAll(By.css('.jam-slide-element'))[1];
      slideElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      expect(component.selectedIndex).toBe(1);
    }));

    // Note: needs to be `async` in order to fail when we expect it to.
    it('should set to correct slide on fast change', async(() => {
      let component = fixture.componentInstance;
      component.selectedIndex = 0;
      fixture.detectChanges();

      setTimeout(() => {
        component.selectedIndex = 1;
        fixture.detectChanges();

        setTimeout(() => {
          component.selectedIndex = 0;
          fixture.detectChanges();
          fixture.whenSslidele().then(() => {
            expect(component.selectedIndex).toBe(0);
          });
        }, 1);
      }, 1);
    }));

    it('should change slides based on selectedIndex', fakeAsync(() => {
      let component = fixture.componentInstance;
      let slideComponent = fixture.debugElement.query(By.css('jam-slide-group')).componentInstance;

      spyOn(component, 'handleSelection').and.callThrough();

      checkSelectedIndex(1, fixture);

      slideComponent.selectedIndex = 2;

      checkSelectedIndex(2, fixture);
      tick();

      expect(component.handleSelection).toHaveBeenCalledTimes(1);
      expect(component.selectEvent.index).toBe(2);
    }));

    it('should update slide positions when selected index is changed', () => {
      fixture.detectChanges();
      const component: JamSlideGroup =
          fixture.debugElement.query(By.css('jam-slide-group')).componentInstance;
      const slides: JamSlide[] = component._slides.toArray();

      expect(slides[0].position).toBeLessThan(0);
      expect(slides[1].position).toBe(0);
      expect(slides[2].position).toBeGreaterThan(0);

      // Move to third slide
      component.selectedIndex = 2;
      fixture.detectChanges();
      expect(slides[0].position).toBeLessThan(0);
      expect(slides[1].position).toBeLessThan(0);
      expect(slides[2].position).toBe(0);

      // Move to the first slide
      component.selectedIndex = 0;
      fixture.detectChanges();
      expect(slides[0].position).toBe(0);
      expect(slides[1].position).toBeGreaterThan(0);
      expect(slides[2].position).toBeGreaterThan(0);
    });

    it('should clamp the selected index to the size of the number of slides', () => {
      fixture.detectChanges();
      const component: JamSlideGroup =
          fixture.debugElement.query(By.css('jam-slide-group')).componentInstance;

      // Set the index to be negative, expect first slide selected
      fixture.componentInstance.selectedIndex = -1;
      fixture.detectChanges();
      expect(component.selectedIndex).toBe(0);

      // Set the index beyond the size of the slides, expect last slide selected
      fixture.componentInstance.selectedIndex = 3;
      fixture.detectChanges();
      expect(component.selectedIndex).toBe(2);
    });

    it('should not crash when setting the selected index to NaN', () => {
      let component = fixture.debugElement.componentInstance;

      expect(() => {
        component.selectedIndex = NaN;
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should show ripples for slide-group labels', () => {
      fixture.detectChanges();

      const testElement = fixture.nativeElement;
      const slideElement = fixture.debugElement.queryAll(By.css('.jam-slide-element'))[1];

      expect(testElement.querySelectorAll('.mat-ripple-element').length)
        .toBe(0, 'Expected no ripples to show up initially.');

      dispatchFakeEvent(slideElement.nativeElement, 'mousedown');
      dispatchFakeEvent(slideElement.nativeElement, 'mouseup');

      expect(testElement.querySelectorAll('.mat-ripple-element').length)
        .toBe(1, 'Expected one ripple to show up on element mousedown.');
    });

    it('should allow disabling ripples for slide-group labels', () => {
      fixture.componentInstance.disableRipple = true;
      fixture.detectChanges();

      const testElement = fixture.nativeElement;
      const slideElement = fixture.debugElement.queryAll(By.css('.jam-slide-element'))[1];

      expect(testElement.querySelectorAll('.mat-ripple-element').length)
        .toBe(0, 'Expected no ripples to show up initially.');

      dispatchFakeEvent(slideElement.nativeElement, 'mousedown');
      dispatchFakeEvent(slideElement.nativeElement, 'mouseup');

      expect(testElement.querySelectorAll('.mat-ripple-element').length)
        .toBe(0, 'Expected no ripple to show up on element mousedown.');
    });

    it('should set the isActive flag on each of the slides', fakeAsync(() => {
      fixture.detectChanges();
      tick();

      const slides = fixture.componentInstance.slides.toArray();

      expect(slides[0].isActive).toBe(false);
      expect(slides[1].isActive).toBe(true);
      expect(slides[2].isActive).toBe(false);

      fixture.componentInstance.selectedIndex = 2;
      fixture.detectChanges();
      tick();

      expect(slides[0].isActive).toBe(false);
      expect(slides[1].isActive).toBe(false);
      expect(slides[2].isActive).toBe(true);
    }));

    it('should fire animation done event', fakeAsync(() => {
      fixture.detectChanges();

      spyOn(fixture.componentInstance, 'animationDone');
      let slideElement = fixture.debugElement.queryAll(By.css('.jam-slide-element'))[1];
      slideElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.animationDone).toHaveBeenCalledTimes(1);
    }));

    it('should add the proper `aria-setsize` and `aria-posinset`', () => {
      fixture.detectChanges();

      const labels = Array.from(element.querySelectorAll('.jam-slide-element'));

      expect(labels.map(label => label.getAttribute('aria-posinset'))).toEqual(['1', '2', '3']);
      expect(labels.every(label => label.getAttribute('aria-setsize') === '3')).toBe(true);
    });

    it('should emit focusChange event on click', () => {
      spyOn(fixture.componentInstance, 'handleFocus');
      fixture.detectChanges();

      const slideElements = fixture.debugElement.queryAll(By.css('.jam-slide-element'));

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(0);

      slideElements[1].nativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(1);
      expect(fixture.componentInstance.handleFocus)
        .toHaveBeenCalledWith(jasmine.objectContaining({index: 1}));
    });

    it('should emit focusChange on arrow key navigation', () => {
      spyOn(fixture.componentInstance, 'handleFocus');
      fixture.detectChanges();

      const slideElements = fixture.debugElement.queryAll(By.css('.jam-slide-element'));
      const slideElementContainer = fixture.debugElement
        .query(By.css('.jam-slide-element-container')).nativeElement as HTMLElement;

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(0);

      // In order to verify that the `focusChange` event also fires with the correct
      // index, we focus the second slide before testing the keyboard navigation.
      slideElements[1].nativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(1);

      dispatchKeyboardEvent(slideElementContainer, 'keydown', LEFT_ARROW);

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(2);
      expect(fixture.componentInstance.handleFocus)
        .toHaveBeenCalledWith(jasmine.objectContaining({index: 0}));
    });

  });

  describe('aria labelling', () => {
    let fixture: ComponentFixture<TabGroupWithAriaInputs>;
    let slide: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(TabGroupWithAriaInputs);
      fixture.detectChanges();
      tick();
      slide = fixture.nativeElement.querySelector('.jam-slide-element');
    }));

    it('should not set aria-label or aria-labelledby attributes if they are not passed in', () => {
      expect(slide.hasAttribute('aria-label')).toBe(false);
      expect(slide.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('should set the aria-label attribute', () => {
      fixture.componentInstance.ariaLabel = 'Fruit';
      fixture.detectChanges();

      expect(slide.getAttribute('aria-label')).toBe('Fruit');
    });

    it('should set the aria-labelledby attribute', () => {
      fixture.componentInstance.ariaLabelledby = 'fruit-label';
      fixture.detectChanges();

      expect(slide.getAttribute('aria-labelledby')).toBe('fruit-label');
    });

    it('should not be able to set both an aria-label and aria-labelledby', () => {
      fixture.componentInstance.ariaLabel = 'Fruit';
      fixture.componentInstance.ariaLabelledby = 'fruit-label';
      fixture.detectChanges();

      expect(slide.getAttribute('aria-label')).toBe('Fruit');
      expect(slide.hasAttribute('aria-labelledby')).toBe(false);
    });
  });

  describe('disable slides', () => {
    let fixture: ComponentFixture<DisabledTabsTestApp>;
    beforeEach(() => {
      fixture = TestBed.createComponent(DisabledTabsTestApp);
    });

    it('should have one disabled slide', () => {
      fixture.detectChanges();
      const labels = fixture.debugElement.queryAll(By.css('.jam-slide-disabled'));
      expect(labels.length).toBe(1);
      expect(labels[0].nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set the disabled flag on slide', () => {
      fixture.detectChanges();

      const slides = fixture.componentInstance.slides.toArray();
      let labels = fixture.debugElement.queryAll(By.css('.jam-slide-disabled'));
      expect(slides[2].disabled).toBe(false);
      expect(labels.length).toBe(1);
      expect(labels[0].nativeElement.getAttribute('aria-disabled')).toBe('true');

      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();

      expect(slides[2].disabled).toBe(true);
      labels = fixture.debugElement.queryAll(By.css('.jam-slide-disabled'));
      expect(labels.length).toBe(2);
      expect(labels.every(label => label.nativeElement.getAttribute('aria-disabled') === 'true'))
          .toBe(true);
    });
  });

  describe('dynamic binding slides', () => {
    let fixture: ComponentFixture<SimpleDynamicTabsTestApp>;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SimpleDynamicTabsTestApp);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));

    it('should be able to add a new slide, select it, and have correct origin position',
      fakeAsync(() => {
        const component: JamSlideGroup =
            fixture.debugElement.query(By.css('jam-slide-group')).componentInstance;

        let slides: JamSlide[] = component._slides.toArray();
        expect(slides[0].origin).toBe(null);
        expect(slides[1].origin).toBe(0);
        expect(slides[2].origin).toBe(null);

        // Add a new slide on the right and select it, expect an origin >= than 0 (animate right)
        fixture.componentInstance.slides.push({label: 'New slide', content: 'to right of index'});
        fixture.componentInstance.selectedIndex = 4;
        fixture.detectChanges();
        tick();

        slides = component._slides.toArray();
        expect(slides[3].origin).toBeGreaterThanOrEqual(0);

        // Add a new slide in the beginning and select it, expect an origin < than 0 (animate left)
        fixture.componentInstance.selectedIndex = 0;
        fixture.detectChanges();
        tick();

        fixture.componentInstance.slides.push({label: 'New slide', content: 'to left of index'});
        fixture.detectChanges();
        tick();

        slides = component._slides.toArray();
        expect(slides[0].origin).toBeLessThan(0);
    }));


    it('should update selected index if the last slide removed while selected', fakeAsync(() => {
      const component: JamSlideGroup =
          fixture.debugElement.query(By.css('jam-slide-group')).componentInstance;

      const numberOfTabs = component._slides.length;
      fixture.componentInstance.selectedIndex = numberOfTabs - 1;
      fixture.detectChanges();
      tick();

      // Remove last slide while last slide is selected, expect next slide over to be selected
      fixture.componentInstance.slides.pop();
      fixture.detectChanges();
      tick();

      expect(component.selectedIndex).toBe(numberOfTabs - 2);
    }));


    it('should maintain the selected slide if a new slide is added', () => {
      fixture.detectChanges();
      const component: JamSlideGroup =
          fixture.debugElement.query(By.css('jam-slide-group')).componentInstance;

      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();

      // Add a new slide at the beginning.
      fixture.componentInstance.slides.unshift({label: 'New slide', content: 'at the start'});
      fixture.detectChanges();

      expect(component.selectedIndex).toBe(2);
      expect(component._slides.toArray()[2].isActive).toBe(true);
    });


    it('should maintain the selected slide if a slide is removed', () => {
      // Select the second slide.
      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();

      const component: JamSlideGroup =
          fixture.debugElement.query(By.css('jam-slide-group')).componentInstance;

      // Remove the first slide that is right before the selected one.
      fixture.componentInstance.slides.splice(0, 1);
      fixture.detectChanges();

      // Since the first slide has been removed and the second one was selected before, the selected
      // slide moved one position to the right. Meaning that the slide is now the first slide.
      expect(component.selectedIndex).toBe(0);
      expect(component._slides.toArray()[0].isActive).toBe(true);
    });

    it('should be able to select a new slide after creation', fakeAsync(() => {
      fixture.detectChanges();
      const component: JamSlideGroup =
        fixture.debugElement.query(By.css('jam-slide-group')).componentInstance;

      fixture.componentInstance.slides.push({label: 'Last slide', content: 'at the end'});
      fixture.componentInstance.selectedIndex = 3;

      fixture.detectChanges();
      tick();

      expect(component.selectedIndex).toBe(3);
      expect(component._slides.toArray()[3].isActive).toBe(true);
    }));

    it('should not fire `selectedTabChange` when the amount of slides changes', fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();

      // Add a new slide at the beginning.
      spyOn(fixture.componentInstance, 'handleSelection');
      fixture.componentInstance.slides.unshift({label: 'New slide', content: 'at the start'});
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleSelection).not.toHaveBeenCalled();
    }));

  });

  describe('async slides', () => {
    let fixture: ComponentFixture<AsyncTabsTestApp>;

    it('should show slides when they are available', fakeAsync(() => {
      fixture = TestBed.createComponent(AsyncTabsTestApp);

      expect(fixture.debugElement.queryAll(By.css('.jam-slide-element')).length).toBe(0);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();

      expect(fixture.debugElement.queryAll(By.css('.jam-slide-element')).length).toBe(2);
    }));
  });

  describe('with simple api', () => {
    let fixture: ComponentFixture<TabGroupWithSimpleApi>;
    let slideGroup: JamSlideGroup;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(TabGroupWithSimpleApi);
      fixture.detectChanges();
      tick();

      slideGroup =
          fixture.debugElement.query(By.directive(JamSlideGroup)).componentInstance as JamSlideGroup;
    }));

    it('should support a slide-group with the simple api', fakeAsync(() => {
      expect(getSelectedLabel(fixture).textContent).toMatch('Junk food');
      expect(getSelectedContent(fixture).textContent).toMatch('Pizza, fries');

      slideGroup.selectedIndex = 2;
      fixture.detectChanges();
      tick();

      expect(getSelectedLabel(fixture).textContent).toMatch('Fruit');
      expect(getSelectedContent(fixture).textContent).toMatch('Apples, grapes');

      fixture.componentInstance.otherLabel = 'Chips';
      fixture.componentInstance.otherContent = 'Salt, vinegar';
      fixture.detectChanges();

      expect(getSelectedLabel(fixture).textContent).toMatch('Chips');
      expect(getSelectedContent(fixture).textContent).toMatch('Salt, vinegar');
    }));

    it('should support @ViewChild in the slide content', () => {
      expect(fixture.componentInstance.legumes).toBeTruthy();
    });

    it('should only have the active slide in the DOM', fakeAsync(() => {
      expect(fixture.nativeElement.textContent).toContain('Pizza, fries');
      expect(fixture.nativeElement.textContent).not.toContain('Peanuts');

      slideGroup.selectedIndex = 3;
      fixture.detectChanges();
      tick();

      expect(fixture.nativeElement.textContent).not.toContain('Pizza, fries');
      expect(fixture.nativeElement.textContent).toContain('Peanuts');
    }));

    it('should support setting the header position', () => {
      let slideGroupNode = fixture.debugElement.query(By.css('jam-slide-group')).nativeElement;

      expect(slideGroupNode.classList).not.toContain('jam-slide-group-inverted-header');

      slideGroup.headerPosition = 'below';
      fixture.detectChanges();

      expect(slideGroupNode.classList).toContain('jam-slide-group-inverted-header');
    });
  });

  describe('lazy loaded slides', () => {
    it('should lazy load the second slide', fakeAsync(() => {
      const fixture = TestBed.createComponent(TemplateTabs);
      fixture.detectChanges();
      tick();

      const secondLabel = fixture.debugElement.queryAll(By.css('.jam-slide-element'))[1];
      secondLabel.nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const child = fixture.debugElement.query(By.css('.child'));
      expect(child.nativeElement).toBeDefined();
    }));
  });

  describe('special cases', () => {
    it('should not throw an error when binding isActive to the view', fakeAsync(() => {
      const fixture = TestBed.createComponent(TabGroupWithIsActiveBinding);

      expect(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }).not.toThrow();

      expect(fixture.nativeElement.textContent).toContain('pizza is active');
    }));
  });

  /**
   * Checks that the `selectedIndex` has been updated; checks that the element and body have their
   * respective `active` classes
   */
  function checkSelectedIndex(expectedIndex: number, fixture: ComponentFixture<any>) {
    fixture.detectChanges();

    let slideComponent: JamSlideGroup = fixture.debugElement
        .query(By.css('jam-slide-group')).componentInstance;
    expect(slideComponent.selectedIndex).toBe(expectedIndex);

    let slideElementElement = fixture.debugElement
        .query(By.css(`.jam-slide-element:nth-of-type(${expectedIndex + 1})`)).nativeElement;
    expect(slideElementElement.classList.contains('jam-slide-element-active')).toBe(true);

    let slideContentElement = fixture.debugElement
        .query(By.css(`jam-slide-body:nth-of-type(${expectedIndex + 1})`)).nativeElement;
    expect(slideContentElement.classList.contains('jam-slide-body-active')).toBe(true);
  }

  function getSelectedLabel(fixture: ComponentFixture<any>): HTMLElement {
    return fixture.nativeElement.querySelector('.jam-slide-element-active');
  }

  function getSelectedContent(fixture: ComponentFixture<any>): HTMLElement {
    return fixture.nativeElement.querySelector('.jam-slide-body-active');
  }
});


describe('nested JamSlideGroup with enabled animations', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [JamSlidesModule, BrowserAnimationsModule],
      declarations: [NestedTabs, TabsWithCustomAnimationDuration]
    });

    TestBed.compileComponents();
  }));

  it('should not throw when creating a component with nested slide groups', fakeAsync(() => {
    expect(() => {
      let fixture = TestBed.createComponent(NestedTabs);
      fixture.detectChanges();
      tick();
    }).not.toThrow();
  }));

  it('should not throw when setting an animationDuration without units', fakeAsync(() => {
    expect(() => {
      let fixture = TestBed.createComponent(TabsWithCustomAnimationDuration);
      fixture.detectChanges();
      tick();
    }).not.toThrow();
  }));
});


@Component({
  template: `
    <jam-slide-group class="slide-group"
        [(selectedIndex)]="selectedIndex"
        [headerPosition]="headerPosition"
        [disableRipple]="disableRipple"
        (animationDone)="animationDone()"
        (focusChange)="handleFocus($event)"
        (selectedTabChange)="handleSelection($event)">
      <jam-slide>
        <ng-template jam-slide-element>Tab One</ng-template>
        Tab one content
      </jam-slide>
      <jam-slide>
        <ng-template jam-slide-element>Tab Two</ng-template>
        <span>Tab </span><span>two</span><span>content</span>
      </jam-slide>
      <jam-slide>
        <ng-template jam-slide-element>Tab Three</ng-template>
        Tab three content
      </jam-slide>
    </jam-slide-group>
  `
})
class SimpleTabsTestApp {
  @ViewChildren(JamSlide) slides: QueryList<JamSlide>;
  selectedIndex: number = 1;
  focusEvent: any;
  selectEvent: any;
  disableRipple: boolean = false;
  headerPosition: JamSlideHeaderPosition = 'above';
  handleFocus(event: any) {
    this.focusEvent = event;
  }
  handleSelection(event: any) {
    this.selectEvent = event;
  }
  animationDone() { }
}

@Component({
  template: `
    <jam-slide-group class="slide-group"
        [(selectedIndex)]="selectedIndex"
        (focusChange)="handleFocus($event)"
        (selectedTabChange)="handleSelection($event)">
      <jam-slide *ngFor="let slide of slides">
        <ng-template jam-slide-element>{{slide.label}}</ng-template>
        {{slide.content}}
      </jam-slide>
    </jam-slide-group>
  `
})
class SimpleDynamicTabsTestApp {
  slides = [
    {label: 'Label 1', content: 'Content 1'},
    {label: 'Label 2', content: 'Content 2'},
    {label: 'Label 3', content: 'Content 3'},
  ];
  selectedIndex: number = 1;
  focusEvent: any;
  selectEvent: any;
  handleFocus(event: any) {
    this.focusEvent = event;
  }
  handleSelection(event: any) {
    this.selectEvent = event;
  }
}

@Component({
  template: `
    <jam-slide-group class="slide-group" [(selectedIndex)]="selectedIndex">
      <jam-slide *ngFor="let slide of slides" label="{{slide.label}}">
        {{slide.content}}
      </jam-slide>
    </jam-slide-group>
  `
})
class BindedTabsTestApp {
  slides = [
    { label: 'one', content: 'one' },
    { label: 'two', content: 'two' }
  ];
  selectedIndex = 0;

  addNewActiveTab(): void {
    this.slides.push({
      label: 'new slide',
      content: 'new content'
    });
    this.selectedIndex = this.slides.length - 1;
  }
}

@Component({
  selector: 'test-app',
  template: `
    <jam-slide-group class="slide-group">
      <jam-slide>
        <ng-template jam-slide-element>Tab One</ng-template>
        Tab one content
      </jam-slide>
      <jam-slide disabled>
        <ng-template jam-slide-element>Tab Two</ng-template>
        Tab two content
      </jam-slide>
      <jam-slide [disabled]="isDisabled">
        <ng-template jam-slide-element>Tab Three</ng-template>
        Tab three content
      </jam-slide>
    </jam-slide-group>
  `,
})
class DisabledTabsTestApp {
  @ViewChildren(JamSlide) slides: QueryList<JamSlide>;
  isDisabled = false;
}

@Component({
  template: `
    <jam-slide-group class="slide-group">
      <jam-slide *ngFor="let slide of slides | async">
        <ng-template jam-slide-element>{{ slide.label }}</ng-template>
        {{ slide.content }}
      </jam-slide>
   </jam-slide-group>
  `
})
class AsyncTabsTestApp implements OnInit {
  private _slides = [
    { label: 'one', content: 'one' },
    { label: 'two', content: 'two' }
  ];

  slides: Observable<any>;

  ngOnInit() {
    // Use ngOnInit because there is some issue with scheduling the async task in the constructor.
    this.slides = new Observable((observer: any) => {
      setTimeout(() => observer.next(this._slides));
    });
  }
}


@Component({
  template: `
  <jam-slide-group>
    <jam-slide label="Junk food"> Pizza, fries </jam-slide>
    <jam-slide label="Vegeslideles"> Broccoli, spinach </jam-slide>
    <jam-slide [label]="otherLabel"> {{otherContent}} </jam-slide>
    <jam-slide label="Legumes"> <p #legumes>Peanuts</p> </jam-slide>
  </jam-slide-group>
  `
})
class TabGroupWithSimpleApi {
  otherLabel = 'Fruit';
  otherContent = 'Apples, grapes';
  @ViewChild('legumes') legumes: any;
}


@Component({
  selector: 'nested-slides',
  template: `
    <jam-slide-group>
      <jam-slide label="One">Tab one content</jam-slide>
      <jam-slide label="Two">
        Tab two content
         <jam-slide-group [dynamicHeight]="true">
          <jam-slide label="Inner slide one">Inner content one</jam-slide>
          <jam-slide label="Inner slide two">Inner content two</jam-slide>
        </jam-slide-group>
      </jam-slide>
    </jam-slide-group>
  `,
})
class NestedTabs {}

@Component({
  selector: 'template-slides',
  template: `
    <jam-slide-group>
      <jam-slide label="One">
        Eager
      </jam-slide>
      <jam-slide label="Two">
        <ng-template jamSlideContent>
          <div class="child">Hi</div>
        </ng-template>
      </jam-slide>
    </jam-slide-group>
  `,
 })
 class TemplateTabs {}


 @Component({
  template: `
  <jam-slide-group>
    <jam-slide [aria-label]="ariaLabel" [aria-labelledby]="ariaLabelledby"></jam-slide>
  </jam-slide-group>
  `
})
class TabGroupWithAriaInputs {
  ariaLabel: string;
  ariaLabelledby: string;
}


@Component({
  template: `
    <jam-slide-group>
      <jam-slide label="Junk food" #pizza> Pizza, fries </jam-slide>
      <jam-slide label="Vegeslideles"> Broccoli, spinach </jam-slide>
    </jam-slide-group>

    <div *ngIf="pizza.isActive">pizza is active</div>
  `
})
class TabGroupWithIsActiveBinding {
}


@Component({
  template: `
    <jam-slide-group animationDuration="500">
      <jam-slide label="One">Tab one content</jam-slide>
      <jam-slide label="Two">Tab two content</jam-slide>
    </jam-slide-group>
  `,
})
class TabsWithCustomAnimationDuration {}
