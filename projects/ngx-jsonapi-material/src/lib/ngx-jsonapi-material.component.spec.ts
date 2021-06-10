import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJsonapiMaterialComponent } from './ngx-jsonapi-material.component';

describe('NgxJsonapiMaterialComponent', (): void => {
  let component: NgxJsonapiMaterialComponent;
  let fixture: ComponentFixture<NgxJsonapiMaterialComponent>;

  beforeEach(waitForAsync((): void => {
    TestBed.configureTestingModule({
      declarations: [ NgxJsonapiMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(NgxJsonapiMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
