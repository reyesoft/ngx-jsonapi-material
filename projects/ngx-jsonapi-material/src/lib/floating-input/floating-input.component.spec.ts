/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */

import { FloatingInputComponent } from './floating-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UrlTree } from '@angular/router';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { mock, instance, when } from 'ts-mockito';
import { Observable } from 'rxjs';

// tslint:disable: no-void-expression
export class DummyComponent {}

describe('FloatingInputComponent', () => {
    let component: FloatingInputComponent;
    let fixture: ComponentFixture<FloatingInputComponent>;
    jest.useFakeTimers();

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                RouterTestingModule.withRoutes([{ path: 'companies/:company_id/dashboard', component: DummyComponent }])
            ],
            declarations: [FloatingInputComponent],
            providers: []
        }).compileComponents();
    });
    it('should create FloatingInputComponent', () => {
        fixture = TestBed.createComponent(FloatingInputComponent);
        component = fixture.debugElement.componentInstance;
        component.router.initialNavigation();
        expect(component).toBeTruthy();
    });
    it('should fill searchParams with router UrlTree when instantiating', () => {
        expect(component.searchParams).toBeDefined();
        expect(component.searchParams instanceof UrlTree).toBeTruthy();
    });
    it('statusToggle should update status with the passed attribute and call focusInput method if status arg is truthy', async () => {
        let focusInput_spy = spyOn(component as any, 'focusInput');
        component.status = true;
        component.lock = false;
        component.statusToggle(false);
        jest.runAllTimers();
        expect(component.status).toBeFalsy();
        expect(focusInput_spy).not.toHaveBeenCalled();
        component.statusToggle(true);
        jest.runAllTimers();
        expect(component.status).toBeTruthy();
        expect(focusInput_spy).toHaveBeenCalled();
    });
    it('statusToggle should do nothing if component s lock property is truthy', async () => {
        let focusInput_spy = spyOn(component as any, 'focusInput');
        component.status = false;
        component.lock = true;
        component.statusToggle(true);
        jest.runAllTimers();
        expect(component.status).toBeFalsy();
        expect(focusInput_spy).not.toHaveBeenCalled();
    });
    it('focusInput should focus floating-input element', async () => {
        fixture = TestBed.createComponent(FloatingInputComponent);
        component = fixture.debugElement.componentInstance;
        component.status = true;
        fixture.detectChanges();
        await fixture.whenStable().then(() => {
            let floating_input_element = fixture.debugElement.query(By.css('input[id=floatingInput]'));
            let floating_input_element_spy = spyOn(floating_input_element.nativeElement, 'focus');
            (component as any).focusInput();
            expect(floating_input_element_spy).toHaveBeenCalled();
        });
    });
    it('bindingEntryValue should emit entryValueChange with the passed argument', () => {
        let entryValueChange_spy = spyOn(component.entryValueChange, 'emit');
        (component as any).bindingEntryValue(1);
        expect(entryValueChange_spy).toHaveBeenCalledWith(1);
    });
    it('keyPress should set component status roperty to false when pressing Enter', () => {
        component.status = true;
        (component as any).keyPress(13);
        expect(component.status).toBeFalsy();
    });
    it('floatingInput element should call statusToggle on blur', async () => {
        fixture = TestBed.createComponent(FloatingInputComponent);
        component = fixture.debugElement.componentInstance;
        component.status = true;
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let floating_input_element = fixture.debugElement.query(By.css('input[id=floatingInput]'));
            (component as any).focusInput();
            fixture.detectChanges();
            await fixture.whenStable().then(() => {
                let statusToggle_spy = spyOn(component, 'statusToggle');
                floating_input_element.nativeElement.blur();
                expect(statusToggle_spy).toHaveBeenCalledWith(false);
            });
        });
    });
    it('floatingInput element content should be equal to component s entryValue binding', async () => {
        fixture = TestBed.createComponent(FloatingInputComponent);
        component = fixture.debugElement.componentInstance;
        component.status = true;
        component.entryValue = 10;
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let floating_input_element = fixture.debugElement.query(By.css('input[id=floatingInput]'));
            expect(floating_input_element.nativeElement.ngModel).toBe(10);
        });
    });
    it('floatingInput element should call bindingEntryValue on ngModelChange', async () => {
        fixture = TestBed.createComponent(FloatingInputComponent);
        component = fixture.debugElement.componentInstance;
        component.status = true;
        component.entryValue = 10;
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let bindingEntryValue_spy = spyOn(component, 'bindingEntryValue');
            let floating_input_element = fixture.debugElement.query(By.css('input[id=floatingInput]'));
            floating_input_element.triggerEventHandler('ngModelChange', 15);
            expect(bindingEntryValue_spy).toHaveBeenCalledWith(15);
        });
    });
    it('floatingInput element should call keyPress on keydown event', async () => {
        fixture = TestBed.createComponent(FloatingInputComponent);
        component = fixture.debugElement.componentInstance;
        component.status = true;
        component.entryValue = 10;
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let event = new KeyboardEvent('keydown', { key: 'Enter' });
            let bindingEntryValue_spy = spyOn(component, 'keyPress');
            let floating_input_element = fixture.debugElement.query(By.css('input[id=floatingInput]'));
            floating_input_element.nativeElement.dispatchEvent(event);
            expect(bindingEntryValue_spy).toHaveBeenCalled();
        });
    });
});
