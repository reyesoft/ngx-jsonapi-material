import { TestBed, inject } from '@angular/core/testing';

import { NgxJsonapiMaterialService } from './ngx-jsonapi-material.service';

describe('NgxJsonapiMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxJsonapiMaterialService]
    });
  });

  it('should be created', inject([NgxJsonapiMaterialService], (service: NgxJsonapiMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
