import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mock, instance, when, anything } from 'ts-mockito';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditTextAttributeDialogComponent, IEditTextAttributeData } from './edit-text-attribute-dialog.component';
import { Resource } from 'ngx-jsonapi';

const dialogMock = {
    close: (data): any => {
        return data;
    }
};

const resourceMock: any = {
    attributes: { observation: '' }
};

describe('EditTextAttributeDialogComponent', () => {
    let component: EditTextAttributeDialogComponent;
    let fixture: ComponentFixture<EditTextAttributeDialogComponent>;
    let submit_button: IEditTextAttributeData = {
        accept: '',
        title: 'Observación',
        resource: resourceMock,
        attribute: 'observation'
    };

    jest.useFakeTimers();

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [RouterTestingModule],
            declarations: [EditTextAttributeDialogComponent],
            providers: [
                MatDialog,
                { provide: MatDialogRef, useValue: dialogMock },
                { provide: MAT_DIALOG_DATA, useFactory: (): IEditTextAttributeData => submit_button }
            ]
        }).compileComponents();
    });

    it('should be created', () => {
        fixture = TestBed.createComponent(EditTextAttributeDialogComponent);
        component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

    it('If data.accept has nothing, then you must fill in the default value "Accept".', () => {
        fixture = TestBed.createComponent(EditTextAttributeDialogComponent);
        component = fixture.debugElement.componentInstance;
        expect(component.data.accept).toEqual('Aceptar');
    });

    it('If data.accept receives a value, it shows that value.', () => {
        submit_button.accept = 'Enviar';
        fixture = TestBed.createComponent(EditTextAttributeDialogComponent);
        component = fixture.debugElement.componentInstance;
        expect(component.data.accept).toEqual('Enviar');
    });

    it('The attribute of the resource is filled by calling updateAttributeAndClose, using the values of its arguments', () => {
        fixture = TestBed.createComponent(EditTextAttributeDialogComponent);
        component = fixture.debugElement.componentInstance;

        component.updateAttributeAndClose(submit_button.attribute, 'Esto es una observación');
        expect(component.data.resource.attributes.observation).toEqual('Esto es una observación');
    });

    it('When you click on it, call the updateAttributeAndClose method.', () => {
        let updateAttributeAndClose_spy = spyOn(component, 'updateAttributeAndClose');
        let event = new KeyboardEvent('Enter', {
            key: 'Enter',
            bubbles: true
        });
        component.onKeyUp(event);
        expect(updateAttributeAndClose_spy).toHaveBeenCalled();
    });

    it('If you press the shift combination but enter you should not call the method, updateAttributeAndClose', () => {
        let updateAttributeAndClose_spy = spyOn(component, 'updateAttributeAndClose');
        let event = new KeyboardEvent('Enter', {
            key: 'Enter',
            shiftKey: true,
            bubbles: true
        });
        component.onKeyUp(event);
        expect(updateAttributeAndClose_spy).not.toHaveBeenCalled();
    });
});
