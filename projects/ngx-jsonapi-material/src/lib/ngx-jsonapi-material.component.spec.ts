import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJsonapiMaterialComponent } from './ngx-jsonapi-material.component';

describe('NgxJsonapiMaterialComponent', () => {
  let component: NgxJsonapiMaterialComponent;
  let fixture: ComponentFixture<NgxJsonapiMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxJsonapiMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxJsonapiMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
