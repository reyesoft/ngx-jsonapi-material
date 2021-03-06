import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { SingleWarningComponent } from '../single-warning/single-warning.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('NgxJsonapiMaterialComponent', (): void => {
    let component: SingleWarningComponent;
    let fixture: ComponentFixture<SingleWarningComponent>;

    beforeEach(waitForAsync((): void => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ SingleWarningComponent ],
            imports: [NoopAnimationsModule]
        })
        .compileComponents();
    }));

    beforeEach((): void => {
        fixture = TestBed.createComponent(SingleWarningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('if message is defined, then the component should be shown.', (): void => {
        component.message = 'Esto es un mensaje';
        expect(component.message).toBeDefined();
        fixture.detectChanges();
        let single_warning_component = fixture.debugElement.query(By.css('mat-card'));
        expect(single_warning_component).toBeDefined();
    });

    it('if message is not defined, then the component should not be shown.', (): void => {
        component.message = null;
        expect(component.message).toBeNull();
        fixture.detectChanges();
        let single_warning_component = fixture.debugElement.query(By.css('mat-card'));
        expect(single_warning_component).toBeNull();
    });
});
