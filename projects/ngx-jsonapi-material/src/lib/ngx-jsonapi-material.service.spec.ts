import { TestBed, inject } from '@angular/core/testing';

import { NgxJsonapiMaterialService } from './ngx-jsonapi-material.service';

describe('NgxJsonapiMaterialService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [NgxJsonapiMaterialService]
    });
  });

  it('should be created', inject([NgxJsonapiMaterialService], (service: NgxJsonapiMaterialService): void => {
    expect(service).toBeTruthy();
  }));
});
