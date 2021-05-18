import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FabSpeedDialComponent } from './fab-speed-dial.component';
import { By } from '@angular/platform-browser';
import { FabSpeedDialModule } from './fab-speed-dial.module';
import { FabSpeedDialMiniButton } from './fab-speed-dial-mini-button';

// @todo FE-158: test FabSpeedDialComponent and move to ngx-jsonapi-material
describe('FabSpeedDialComponent', () => {
    let component: FabSpeedDialComponent;
    let fixture: ComponentFixture<FabSpeedDialComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([{path: 'fab', component: FabSpeedDialComponent}]),
                FabSpeedDialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FabSpeedDialComponent);
        component = fixture.componentInstance;
        component.tooltip = 'Fab button tooltip';
        component.icon = 'alarm';
        let fab_speed_dial_mini_buttons: Array<FabSpeedDialMiniButton> = [
            new FabSpeedDialMiniButton('smallButtonKey', 'Small button')
        ];
        component.fabSpeedDialMiniButtons = fab_speed_dial_mini_buttons;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show smaller buttons on mouse hover', async(() => {
        let mouseover = new Event('mouseover');
        let fab_button_container = fixture.debugElement.query(By.css('eco-fab-speed-dial'));
        fab_button_container.nativeElement.dispatchEvent(mouseover);
        fixture.detectChanges();
        fixture.whenStable();
        let smaller_button = fixture.debugElement.query(By.css('eco-fab-speed-dial-actions'));
        expect(smaller_button).toBeTruthy();
        expect(smaller_button.properties.hidden).toBeFalsy();
    }));

    it('should hide smaller buttons on mouse leave', async(() => {
        let mouseleave = new Event('mouseleave');
        let fab_button = fixture.debugElement.query(By.css('eco-fab-speed-dial'));
        fab_button.nativeElement.dispatchEvent(mouseleave);
        fixture.detectChanges();
        fixture.whenStable();
        let smaller_button_container = fixture.debugElement.query(By.css('eco-fab-speed-dial-actions'));
        expect(smaller_button_container).toBeTruthy();
        expect(smaller_button_container.properties.hidden).toBeTruthy();
    }));

    it('should emit fabSpeedDialClick', () => {
        let fabSpeedDialClickSpy = spyOn(component.fabSpeedDialClick, 'emit');
        let fab_button = fixture.debugElement.query(By.css('eco-fab-speed-dial-trigger > button'));
        fab_button.nativeElement.click();
        expect(fabSpeedDialClickSpy).toHaveBeenCalled();
    });

    it('should emit actionsClick', () => {
        let actionsClickSpy = spyOn(component.actionsClick, 'emit');
        component.fab_status.opened = true;
        fixture.detectChanges();
        let smaller_button = fixture.debugElement.query(By.css('eco-fab-speed-dial-actions > button'));
        smaller_button.nativeElement.click();
        expect(actionsClickSpy).toHaveBeenCalledWith('smallButtonKey');
    });

    it('tooltips should be passed to the view', () => {
        let fab_button = fixture.debugElement.query(By.css('eco-fab-speed-dial-trigger > button'));
        component.fab_status.opened = true;
        fixture.detectChanges();
        let smaller_button = fixture.debugElement.query(By.css('eco-fab-speed-dial-actions > button'));
        expect(fab_button.attributes['ng-reflect-message']).toBe('Fab button tooltip');
        expect(smaller_button.attributes['ng-reflect-message']).toBe('Small button');
    });

    it('should display smaller buttons mat-icon or svg-icon', async(() => {
        component.fab_status.opened = true;
        fixture.detectChanges();
        let smaller_button_icon = fixture.debugElement.query(By.css('eco-fab-speed-dial-actions > button mat-icon'));
        expect(smaller_button_icon.attributes['ng-reflect-svg-icon']).toBeFalsy();
        component.fabSpeedDialMiniButtons[0].icon.type = 'svg-icon';
        fixture.detectChanges();
        fixture.whenStable();
        smaller_button_icon = fixture.debugElement.query(By.css('eco-fab-speed-dial-actions > button mat-icon'));
        expect(smaller_button_icon.attributes['ng-reflect-svg-icon']).toBeTruthy();
    }));
});
