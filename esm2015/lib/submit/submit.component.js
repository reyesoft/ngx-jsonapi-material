/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
export class SubmitComponent {
    constructor(location, router, activatedRoute) {
        this.location = location;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.submitAppearance = 'mat-flat-button';
        this.submitColor = 'primary';
        this.goBack = false;
        this.loading = false;
        this.accept = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    changeState(event) {
        if (!this.noCancel && this.goBack) {
            this.location.back();
            this.cancel.emit('goBack');
        }
        else if (this.cancel) {
            this.cancel.emit();
        }
        else if (this.cancelState && (this.cancelState.slice(0, 2) === '..')) {
            this.router.navigate([this.cancelState], { relativeTo: this.activatedRoute });
        }
        else {
            this.router.navigate([this.cancelState], { queryParams: this.cancelParamsState });
        }
    }
    submit() {
        this.accept.emit();
    }
}
SubmitComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-submit',
                styles: [`div,div button[type=submit]{width:inherit}div button[type=submit]{min-height:36px}`],
                template: `<div fxLayout="row" fxLayoutAlign="end center">
    <button type="button" mat-button color="accent" *ngIf="!noCancel" (click)="changeState($event)" class="accent pull-right" rs-esc-key>Cancelar</button>
    <button mat-button  type="submit" aria-label="Guardar" class="pull-right"
        [color]="submitColor"
        [ngClass]="submitAppearance"
        [disabled]="loading || disabled"
        (click)="submit()">
        <div fxLayout="row" fxLayoutAlign="center center">
            <span *ngIf="!loading" class="elements-up">{{ (submitLabel ? submitLabel : 'Guardar') | uppercase }}</span>
            <mat-progress-spinner class="elements-up default"
                *ngIf="loading"
                mode="indeterminate"
                value="value"
                diameter="20"
                aria-label="Cargando Espere">
            </mat-progress-spinner>
        </div>
    </button>
</div>
`
            },] },
];
/** @nocollapse */
SubmitComponent.ctorParameters = () => [
    { type: Location },
    { type: Router },
    { type: ActivatedRoute }
];
SubmitComponent.propDecorators = {
    submitAppearance: [{ type: Input }],
    submitColor: [{ type: Input }],
    disabled: [{ type: Input }],
    noCancel: [{ type: Input }],
    cancelParamsState: [{ type: Input }],
    submitLabel: [{ type: Input }],
    cancelState: [{ type: Input }],
    goBack: [{ type: Input }],
    loading: [{ type: Input }],
    accept: [{ type: Output }],
    cancel: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3N1Ym1pdC9zdWJtaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQTBCM0MsTUFBTSxPQUFPLGVBQWU7SUFheEIsWUFDWSxRQUFrQixFQUNuQixNQUFjLEVBQ2QsY0FBOEI7UUFGN0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBZnpCLHFCQUFnQixHQUFrRixpQkFBaUIsQ0FBQztRQUNwSCxnQkFBVyxHQUF1QixTQUFTLENBQUM7UUFNNUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDeEIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU03RCxDQUFDO0lBRUcsV0FBVyxDQUFDLEtBQUs7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlCO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDakY7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7U0FDckY7SUFDTCxDQUFDO0lBRU0sTUFBTTtRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7O1lBMURKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsTUFBTSxFQUFFLENBQUMsb0ZBQW9GLENBQUM7Z0JBQzlGLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1CYjthQUNBOzs7O1lBekJRLFFBQVE7WUFGUixNQUFNO1lBQUUsY0FBYzs7OytCQTZCMUIsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSztnQ0FDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsTUFBTTtxQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTcgUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXN1Ym1pdCcsXG4gICAgc3R5bGVzOiBbYGRpdixkaXYgYnV0dG9uW3R5cGU9c3VibWl0XXt3aWR0aDppbmhlcml0fWRpdiBidXR0b25bdHlwZT1zdWJtaXRde21pbi1oZWlnaHQ6MzZweH1gXSxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gY29sb3I9XCJhY2NlbnRcIiAqbmdJZj1cIiFub0NhbmNlbFwiIChjbGljayk9XCJjaGFuZ2VTdGF0ZSgkZXZlbnQpXCIgY2xhc3M9XCJhY2NlbnQgcHVsbC1yaWdodFwiIHJzLWVzYy1rZXk+Q2FuY2VsYXI8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gIHR5cGU9XCJzdWJtaXRcIiBhcmlhLWxhYmVsPVwiR3VhcmRhclwiIGNsYXNzPVwicHVsbC1yaWdodFwiXG4gICAgICAgIFtjb2xvcl09XCJzdWJtaXRDb2xvclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInN1Ym1pdEFwcGVhcmFuY2VcIlxuICAgICAgICBbZGlzYWJsZWRdPVwibG9hZGluZyB8fCBkaXNhYmxlZFwiXG4gICAgICAgIChjbGljayk9XCJzdWJtaXQoKVwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWxvYWRpbmdcIiBjbGFzcz1cImVsZW1lbnRzLXVwXCI+e3sgKHN1Ym1pdExhYmVsID8gc3VibWl0TGFiZWwgOiAnR3VhcmRhcicpIHwgdXBwZXJjYXNlIH19PC9zcGFuPlxuICAgICAgICAgICAgPG1hdC1wcm9ncmVzcy1zcGlubmVyIGNsYXNzPVwiZWxlbWVudHMtdXAgZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgICAgICBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgZGlhbWV0ZXI9XCIyMFwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkNhcmdhbmRvIEVzcGVyZVwiPlxuICAgICAgICAgICAgPC9tYXQtcHJvZ3Jlc3Mtc3Bpbm5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9idXR0b24+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgU3VibWl0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3VibWl0QXBwZWFyYW5jZTogJ21hdC1mbGF0LWJ1dHRvbicgfCAnbWF0LXN0cm9rZWQtYnV0dG9uJyB8ICdtYXQtcmFpc2VkLWJ1dHRvbicgfCAnbWF0LWJ1dHRvbicgPSAnbWF0LWZsYXQtYnV0dG9uJztcbiAgICBASW5wdXQoKSBwdWJsaWMgc3VibWl0Q29sb3I6ICdwcmltYXJ5JyB8ICd3YXJuJyA9ICdwcmltYXJ5JztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIG5vQ2FuY2VsOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjYW5jZWxQYXJhbXNTdGF0ZTogb2JqZWN0O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzdWJtaXRMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjYW5jZWxTdGF0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBnb0JhY2sgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgYWNjZXB0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIGNhbmNlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgICAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHB1YmxpYyBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgY2hhbmdlU3RhdGUoZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vQ2FuY2VsICYmIHRoaXMuZ29CYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsLmVtaXQoJ2dvQmFjaycpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FuY2VsKSB7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbC5lbWl0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYW5jZWxTdGF0ZSAmJiAodGhpcy5jYW5jZWxTdGF0ZS5zbGljZSgwLCAyKSA9PT0gJy4uJykpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmNhbmNlbFN0YXRlXSwgeyByZWxhdGl2ZVRvOiB0aGlzLmFjdGl2YXRlZFJvdXRlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuY2FuY2VsU3RhdGVdLCB7IHF1ZXJ5UGFyYW1zOiB0aGlzLmNhbmNlbFBhcmFtc1N0YXRlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY2NlcHQuZW1pdCgpO1xuICAgIH1cbn1cbiJdfQ==