import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from 'ngx-jsonapi';
export class FloatingInputComponent {
    constructor(router) {
        this.router = router;
        this.entryValueChange = new EventEmitter();
        this.resourceChange = new EventEmitter();
        this.searchParams = router.parseUrl(router.url);
        this.lock = this.lock || false;
    }
    statusToggle(status) {
        if (!this.lock) {
            this.status = status;
            setTimeout(() => {
                if (!status) {
                    return;
                }
                this.focusInput();
            }, 100);
        }
    }
    bindingEntryValue(value) {
        this.entryValueChange.emit(value);
    }
    keyPress(keyCode) {
        switch (keyCode) {
            case 13:
                this.status = false;
                break;
        }
    }
    focusInput() {
        let input = document.getElementById('floatingInput');
        input.focus();
    }
}
FloatingInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-floating-input',
                styles: [`mat-expansion-panel{width:auto;box-shadow:none!important;background:inherit!important;border:0!important}mat-form-field{width:100%}input[type^=number]{text-align:end}`],
                template: `<div class="floating-input" [ngClass]="status ? 'mat-elevation-z1' : ''">
    <mat-expansion-panel
        hideToggle="true"
        style="width: auto; box-shadow: none !important; background: inherit !important; border: 0 !important;"
        [disabled]="lock"
        [expanded]="status"
        (closed)="statusToggle(false)"
        (opened)="statusToggle(true)">
        <mat-expansion-panel-header *ngIf="!status">
            <mat-panel-title fxLayout="row" [fxLayoutAlign]="(horPosition || 'end')">
                <ng-content></ng-content>
            </mat-panel-title>
        </mat-expansion-panel-header>

        <mat-form-field *ngIf="status">
            <input matInput id="floatingInput" type="number" step="0.001" name="floatingNumber" aria-label="Modificar"
                [(ngModel)]="entryValue"
                (blur)="statusToggle(false)"
                (ngModelChange)="bindingEntryValue(entryValue)"
                (keydown)="keyPress($event.keyCode)"
                (focus)="status">
        </mat-form-field>
    </mat-expansion-panel>
</div>
`
            },] },
];
/** @nocollapse */
FloatingInputComponent.ctorParameters = () => [
    { type: Router }
];
FloatingInputComponent.propDecorators = {
    entryValue: [{ type: Input }],
    resource: [{ type: Input }],
    horPosition: [{ type: Input }],
    lock: [{ type: Input }],
    entryValueChange: [{ type: Output }],
    resourceChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmxvYXRpbmctaW5wdXQvZmxvYXRpbmctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUErQnZDLE1BQU0sT0FBTyxzQkFBc0I7SUFZL0IsWUFBMEIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFIdkIscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM5QyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFHM0QsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFFTSxZQUFZLENBQUMsTUFBZTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDVCxPQUFPO2lCQUNWO2dCQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN0QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDWDtJQUNMLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxLQUFhO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxPQUFlO1FBQzNCLFFBQVEsT0FBTyxFQUFFO1lBQ2IsS0FBSyxFQUFFO2dCQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7OztZQTFFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsTUFBTSxFQUFFLENBQUMsd0tBQXdLLENBQUM7Z0JBQ2xMLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0JiO2FBQ0E7Ozs7WUEvQlEsTUFBTTs7O3lCQW9DVixLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzttQkFDTCxLQUFLOytCQUVMLE1BQU07NkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWZsb2F0aW5nLWlucHV0JyxcbiAgICBzdHlsZXM6IFtgbWF0LWV4cGFuc2lvbi1wYW5lbHt3aWR0aDphdXRvO2JveC1zaGFkb3c6bm9uZSFpbXBvcnRhbnQ7YmFja2dyb3VuZDppbmhlcml0IWltcG9ydGFudDtib3JkZXI6MCFpbXBvcnRhbnR9bWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJX1pbnB1dFt0eXBlXj1udW1iZXJde3RleHQtYWxpZ246ZW5kfWBdLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZsb2F0aW5nLWlucHV0XCIgW25nQ2xhc3NdPVwic3RhdHVzID8gJ21hdC1lbGV2YXRpb24tejEnIDogJydcIj5cbiAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbFxuICAgICAgICBoaWRlVG9nZ2xlPVwidHJ1ZVwiXG4gICAgICAgIHN0eWxlPVwid2lkdGg6IGF1dG87IGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDsgYmFja2dyb3VuZDogaW5oZXJpdCAhaW1wb3J0YW50OyBib3JkZXI6IDAgIWltcG9ydGFudDtcIlxuICAgICAgICBbZGlzYWJsZWRdPVwibG9ja1wiXG4gICAgICAgIFtleHBhbmRlZF09XCJzdGF0dXNcIlxuICAgICAgICAoY2xvc2VkKT1cInN0YXR1c1RvZ2dsZShmYWxzZSlcIlxuICAgICAgICAob3BlbmVkKT1cInN0YXR1c1RvZ2dsZSh0cnVlKVwiPlxuICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXIgKm5nSWY9XCIhc3RhdHVzXCI+XG4gICAgICAgICAgICA8bWF0LXBhbmVsLXRpdGxlIGZ4TGF5b3V0PVwicm93XCIgW2Z4TGF5b3V0QWxpZ25dPVwiKGhvclBvc2l0aW9uIHx8ICdlbmQnKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvbWF0LXBhbmVsLXRpdGxlPlxuICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuXG4gICAgICAgIDxtYXQtZm9ybS1maWVsZCAqbmdJZj1cInN0YXR1c1wiPlxuICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IGlkPVwiZmxvYXRpbmdJbnB1dFwiIHR5cGU9XCJudW1iZXJcIiBzdGVwPVwiMC4wMDFcIiBuYW1lPVwiZmxvYXRpbmdOdW1iZXJcIiBhcmlhLWxhYmVsPVwiTW9kaWZpY2FyXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImVudHJ5VmFsdWVcIlxuICAgICAgICAgICAgICAgIChibHVyKT1cInN0YXR1c1RvZ2dsZShmYWxzZSlcIlxuICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImJpbmRpbmdFbnRyeVZhbHVlKGVudHJ5VmFsdWUpXCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJrZXlQcmVzcygkZXZlbnQua2V5Q29kZSlcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJzdGF0dXNcIj5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdJbnB1dENvbXBvbmVudCB7XG4gICAgcHVibGljIHNlYXJjaFBhcmFtczogVXJsVHJlZTtcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcHVibGljIGVudHJ5VmFsdWU6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVzb3VyY2U6IFJlc291cmNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBob3JQb3NpdGlvbjogJ3N0YXJ0JyB8ICdlbmQnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsb2NrOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIHB1YmxpYyBlbnRyeVZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNvdXJjZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzb3VyY2U+KCk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gcm91dGVyLnBhcnNlVXJsKHJvdXRlci51cmwpO1xuICAgICAgICB0aGlzLmxvY2sgPSB0aGlzLmxvY2sgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXR1c1RvZ2dsZShzdGF0dXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBiaW5kaW5nRW50cnlWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZW50cnlWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMga2V5UHJlc3Moa2V5Q29kZTogbnVtYmVyKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c0lucHV0KCk6IHZvaWQge1xuICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxvYXRpbmdJbnB1dCcpO1xuICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==