/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
var SubmitComponent = /** @class */ (function () {
    function SubmitComponent(location, router, activatedRoute) {
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
    SubmitComponent.prototype.changeState = function (event) {
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
    };
    SubmitComponent.prototype.submit = function () {
        this.accept.emit();
    };
    SubmitComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-submit',
                    styles: ["div,div button[type=submit]{width:inherit}div button[type=submit]{min-height:36px}"],
                    template: "<div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n    <button type=\"button\" mat-button color=\"accent\" *ngIf=\"!noCancel\" (click)=\"changeState($event)\" class=\"accent pull-right\" rs-esc-key>Cancelar</button>\n    <button mat-button  type=\"submit\" aria-label=\"Guardar\" class=\"pull-right\"\n        [color]=\"submitColor\"\n        [ngClass]=\"submitAppearance\"\n        [disabled]=\"loading || disabled\"\n        (click)=\"submit()\">\n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n            <span *ngIf=\"!loading\" class=\"elements-up\">{{ (submitLabel ? submitLabel : 'Guardar') | uppercase }}</span>\n            <mat-progress-spinner class=\"elements-up default\"\n                *ngIf=\"loading\"\n                mode=\"indeterminate\"\n                value=\"value\"\n                diameter=\"20\"\n                aria-label=\"Cargando Espere\">\n            </mat-progress-spinner>\n        </div>\n    </button>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    SubmitComponent.ctorParameters = function () { return [
        { type: Location },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
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
    return SubmitComponent;
}());
export { SubmitComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3N1Ym1pdC9zdWJtaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQztJQXFDSSx5QkFDWSxRQUFrQixFQUNuQixNQUFjLEVBQ2QsY0FBOEI7UUFGN0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBZnpCLHFCQUFnQixHQUFrRixpQkFBaUIsQ0FBQztRQUNwSCxnQkFBVyxHQUF1QixTQUFTLENBQUM7UUFNNUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDeEIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU03RCxDQUFDO0lBRUcscUNBQVcsR0FBbEIsVUFBbUIsS0FBSztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUNqRjthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztTQUNyRjtJQUNMLENBQUM7SUFFTSxnQ0FBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOztnQkExREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxZQUFZO29CQUN0QixNQUFNLEVBQUUsQ0FBQyxvRkFBb0YsQ0FBQztvQkFDOUYsUUFBUSxFQUFFLDg4QkFtQmI7aUJBQ0E7Ozs7Z0JBekJRLFFBQVE7Z0JBRlIsTUFBTTtnQkFBRSxjQUFjOzs7bUNBNkIxQixLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO29DQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxNQUFNO3lCQUNOLE1BQU07O0lBd0JYLHNCQUFDO0NBQUEsQUEzREQsSUEyREM7U0FuQ1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKipcbiAqIENvcHlyaWdodCAoQykgMTk5Ny0yMDE3IFJleWVzb2Z0IDxpbmZvQHJleWVzb2Z0LmNvbT5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBNdWx0aW5leG8uIE11bHRpbmV4byBjYW4gbm90IGJlIGNvcGllZCBhbmQvb3JcbiAqIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIGV4cHJlc3MgcGVybWlzc2lvbiBvZiBSZXllc29mdFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnbmd4LWpzb25hcGknO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zdWJtaXQnLFxuICAgIHN0eWxlczogW2BkaXYsZGl2IGJ1dHRvblt0eXBlPXN1Ym1pdF17d2lkdGg6aW5oZXJpdH1kaXYgYnV0dG9uW3R5cGU9c3VibWl0XXttaW4taGVpZ2h0OjM2cHh9YF0sXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uIGNvbG9yPVwiYWNjZW50XCIgKm5nSWY9XCIhbm9DYW5jZWxcIiAoY2xpY2spPVwiY2hhbmdlU3RhdGUoJGV2ZW50KVwiIGNsYXNzPVwiYWNjZW50IHB1bGwtcmlnaHRcIiBycy1lc2Mta2V5PkNhbmNlbGFyPC9idXR0b24+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uICB0eXBlPVwic3VibWl0XCIgYXJpYS1sYWJlbD1cIkd1YXJkYXJcIiBjbGFzcz1cInB1bGwtcmlnaHRcIlxuICAgICAgICBbY29sb3JdPVwic3VibWl0Q29sb3JcIlxuICAgICAgICBbbmdDbGFzc109XCJzdWJtaXRBcHBlYXJhbmNlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImxvYWRpbmcgfHwgZGlzYWJsZWRcIlxuICAgICAgICAoY2xpY2spPVwic3VibWl0KClcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFsb2FkaW5nXCIgY2xhc3M9XCJlbGVtZW50cy11cFwiPnt7IChzdWJtaXRMYWJlbCA/IHN1Ym1pdExhYmVsIDogJ0d1YXJkYXInKSB8IHVwcGVyY2FzZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciBjbGFzcz1cImVsZW1lbnRzLXVwIGRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgbW9kZT1cImluZGV0ZXJtaW5hdGVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgIGRpYW1ldGVyPVwiMjBcIlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJDYXJnYW5kbyBFc3BlcmVcIj5cbiAgICAgICAgICAgIDwvbWF0LXByb2dyZXNzLXNwaW5uZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5gXG59KVxuZXhwb3J0IGNsYXNzIFN1Ym1pdENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHVibGljIHN1Ym1pdEFwcGVhcmFuY2U6ICdtYXQtZmxhdC1idXR0b24nIHwgJ21hdC1zdHJva2VkLWJ1dHRvbicgfCAnbWF0LXJhaXNlZC1idXR0b24nIHwgJ21hdC1idXR0b24nID0gJ21hdC1mbGF0LWJ1dHRvbic7XG4gICAgQElucHV0KCkgcHVibGljIHN1Ym1pdENvbG9yOiAncHJpbWFyeScgfCAnd2FybicgPSAncHJpbWFyeSc7XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBub0NhbmNlbDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsUGFyYW1zU3RhdGU6IG9iamVjdDtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3VibWl0TGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgY2FuY2VsU3RhdGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZ29CYWNrID0gZmFsc2U7XG4gICAgQElucHV0KCkgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgcHVibGljIGFjY2VwdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBjYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgcHVibGljIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwdWJsaWMgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGNoYW5nZVN0YXRlKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5ub0NhbmNlbCAmJiB0aGlzLmdvQmFjaykge1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbC5lbWl0KCdnb0JhY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbmNlbCkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FuY2VsU3RhdGUgJiYgKHRoaXMuY2FuY2VsU3RhdGUuc2xpY2UoMCwgMikgPT09ICcuLicpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5jYW5jZWxTdGF0ZV0sIHsgcmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmNhbmNlbFN0YXRlXSwgeyBxdWVyeVBhcmFtczogdGhpcy5jYW5jZWxQYXJhbXNTdGF0ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdWJtaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWNjZXB0LmVtaXQoKTtcbiAgICB9XG59XG4iXX0=