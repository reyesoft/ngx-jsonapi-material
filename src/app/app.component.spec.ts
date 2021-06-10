import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbar } from '@angular/material/toolbar';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', (): void => {
    beforeEach(
        waitForAsync((): void => {
            TestBed.configureTestingModule({
                schemas: [NO_ERRORS_SCHEMA],
                declarations: [AppComponent, MatToolbar]
            }).compileComponents();
        })
    );
    // prettier-ignore
    it('should create the app', waitForAsync((): void => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    // prettier-ignore
    it(`should have as title 'app'`, waitForAsync((): void => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));
    // prettier-ignore
    it('should render title inside mat-toolbar', waitForAsync((): void => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-toolbar').textContent).toContain('ngx-jsonapi-material example');
    }));
});
