import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { Resource, DocumentCollection } from 'ngx-jsonapi';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Pipe({ name: 'filter' })
class FilterPipeMock implements PipeTransform {
    public static filter(items: Array<any>, term: string): Array<any> {
        return [];
    }

    public transform(items: any, searchText: string): any {
        if (!searchText || !items) return items;

        return FilterPipeMock.filter(items, searchText);
    }
}

describe('NgxJsonapiMaterialComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ SelectComponent, FilterPipeMock ],
            imports: [MatSelectModule, NoopAnimationsModule]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        component.collection = new DocumentCollection();
        component.toRelate = new Resource();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('if limit is falsy, adaptiveArray should be set to collection.data in ngOnInit lifecycle hook', () => {
        expect(component.adaptiveArray).toEqual(component.collection.data);
    });
    it('if limit is truthy, adaptiveArray should be cut to that limit in ngOnInit lifecycle hook', () => {
        component.collection = new DocumentCollection();
        let first_resource = new Resource();
        first_resource.id = '1';
        first_resource.attributes = { data: 'first' };
        let second_resource = new Resource();
        second_resource.id = '2';
        component.collection.data.push(first_resource);
        component.collection.data.push(second_resource);
        component.toRelate = new Resource();
        component.limit = 1;
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.adaptiveArray).toEqual([first_resource]);
    });
    it('toRelate should be set to euqal collections corresponding resource in ngONInit lifecycle hook', () => {
        component.collection = new DocumentCollection();
        let first_resource = new Resource();
        first_resource.id = '1';
        first_resource.attributes = { data: 'first' };
        let second_resource = new Resource();
        second_resource.id = '2';
        component.collection.data.push(first_resource);
        component.collection.data.push(second_resource);
        component.toRelate = new Resource();
        component.toRelate.id = '1';
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.toRelate.attributes.data).toEqual('first');
        expect(component.toRelate).toEqual(first_resource);
    });
    it('updateRelationships should emit toRelateChange EventEmitter with the passed resource', () => {
        let resource = new Resource();
        resource.id = '3';
        let toRelateChange_spy = spyOn(component.toRelateChange, 'emit');
        component.updateRelationships(resource);
        expect(toRelateChange_spy).toHaveBeenCalledTimes(1);
        expect(toRelateChange_spy).toHaveBeenCalledWith(resource);
    });
    it('when no option is selected, placeholder should be shown in mat-select', async () => {
        component.placeholder = undefined;
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let mat_select = fixture.debugElement.query(By.css('mat-select'));
            let mat_select_text = mat_select.query(By.css('span')).nativeElement.innerHTML;
            expect(mat_select_text).toBe('Seleccione una opción');
            component.placeholder = 'Otra cosa';
            fixture.detectChanges();
            await fixture.whenStable().then(async () => {
                mat_select = fixture.debugElement.query(By.css('mat-select'));
                mat_select_text = mat_select.query(By.css('span')).nativeElement.innerHTML;
                expect(mat_select_text).toBe('Otra cosa');
            });
        });
    });
    it ('when a option is selected, mat-select should display the resource attribute passed as displayAttribute', async () => {
        component.collection = new DocumentCollection();
        let resource = new Resource();
        resource.id = '1';
        resource.attributes = { data: 'first' };
        component.collection.data.push(resource);
        component.displayAttribute = 'data';
        component.removeRelationships = false;
        component.placeholder = undefined;
        component.toRelate = new Resource();
        component.toRelate.id = '1';
        component.ngOnInit();
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let mat_select = fixture.debugElement.query(By.css('mat-select'));
            let mat_select_text = mat_select.query(By.css('span')).nativeElement.innerHTML;
            expect(mat_select_text).toBe('Seleccione una opción');
            mat_select.nativeElement.click();
            fixture.detectChanges();
            await fixture.whenStable().then(async () => {
                let mat_options = fixture.debugElement.queryAll(By.css('mat-option'));
                mat_options[0].nativeElement.click();
                fixture.detectChanges();
                await fixture.whenStable().then(async () => {
                    let updated_mat_select = fixture.debugElement.query(By.css('mat-select'));
                    // Need to query for spn twice because the update is inserted
                    let updated_mat_select_text = updated_mat_select.query(By.css('span')).query(By.css('span')).nativeElement.innerHTML;
                    expect(updated_mat_select_text).toBe('first');
                });
            });
        });
    });
    it('updateRelationships should be called each time a new option is selected', async () => {
        await fixture.whenStable().then(async () => {
            let mat_select = fixture.debugElement.query(By.css('mat-select'));
            expect(mat_select).toBeTruthy();
            let updateRelationships_spy = spyOn(component, 'updateRelationships');
            mat_select.triggerEventHandler('ngModelChange', true);
            expect(updateRelationships_spy).toHaveBeenCalledTimes(1);
        });
    });
    it('if removeRelationships is truthy, -- Ninguna -- option should be enabled', async () => {
        component.removeRelationships = true;
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let mat_select = fixture.debugElement.query(By.css('mat-select'));
            mat_select.nativeElement.click();
            fixture.detectChanges();
            await fixture.whenStable().then(async () => {
                let mat_options = fixture.debugElement.queryAll(By.css('mat-option'));
                let none_option;
                mat_options.map(option => {
                    if (option.nativeElement.innerHTML.indexOf('-- Ninguna --') !== -1) {
                        none_option = option.componentInstance.value;
                    }
                });
                expect(none_option).toEqual({});
            });
        });
    });
    it('if  -- Ninguna -- option is selected, update relationships should be called with clear_relationships value', async () => {
        // Si se mejora la implementación en el componente se puede mejorar est test para probar el click, en lugar del ngModelChange
        component.removeRelationships = true;
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let mat_select = fixture.debugElement.query(By.css('mat-select'));
            mat_select.nativeElement.click();
            fixture.detectChanges();
            await fixture.whenStable().then(async () => {
                let mat_options = fixture.debugElement.queryAll(By.css('mat-option'));
                let updateRelationships_spy = spyOn(component, 'updateRelationships');
                mat_options.map(option => {
                    if (option.nativeElement.innerHTML.indexOf('-- Ninguna --') !== -1) {
                        mat_select.triggerEventHandler('ngModelChange', option.componentInstance.value);
                    }
                });
                fixture.detectChanges();
                await fixture.whenStable().then(async () => {
                    expect(updateRelationships_spy).toHaveBeenCalledWith({});
                });
            });
        });
    });
    it('when a option is selected, update relationships should be called with the corresponding option value', async () => {
        // Si se mejora la implementación en el componente se puede mejorar est test para probar el click, en lugar del ngModelChange
        component.collection = new DocumentCollection();
        let resource = new Resource();
        resource.id = '1';
        resource.attributes = { data: 'first' };
        component.collection.data.push(resource);
        component.toRelate = new Resource();
        component.toRelate.id = '1';
        component.removeRelationships = false;
        component.ngOnInit();
        fixture.detectChanges();
        await fixture.whenStable().then(async () => {
            let mat_select = fixture.debugElement.query(By.css('mat-select'));
            mat_select.nativeElement.click();
            fixture.detectChanges();
            await fixture.whenStable().then(async () => {
                let mat_options = fixture.debugElement.queryAll(By.css('mat-option'));
                let updateRelationships_spy = spyOn(component, 'updateRelationships');
                mat_select.triggerEventHandler('ngModelChange', mat_options[0].componentInstance.value);
                fixture.detectChanges();
                await fixture.whenStable().then(async () => {
                    expect(updateRelationships_spy).toHaveBeenCalledWith(resource);
                });
            });
        });
    });
});
