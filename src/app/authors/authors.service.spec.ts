import { TestBed, inject } from '@angular/core/testing';

import { AuthorsService } from './authors.service';

describe('AuthorsService', (): void => {
    beforeEach((): void => {
        TestBed.configureTestingModule({
            providers: [AuthorsService]
        });
    });

    it('should be created', inject([AuthorsService], (service: AuthorsService): void => {
        expect(service).toBeTruthy();
    }));
});
