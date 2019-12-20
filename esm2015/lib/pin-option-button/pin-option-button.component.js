import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
export class PinOptionButtonComponent {
    constructor(matIconRegistry, domSanitizer) {
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.jamColor = 'default';
        this.selected = new EventEmitter();
        this.buttons = [];
    }
    ngOnInit() {
        this.populateMenu();
        this.selected_option = this.defaultSelectedOption();
        this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/all_custom_icons.svg'));
    }
    pinnedOption(event, button) {
        event.stopPropagation();
        this.selected_option = {
            index: button.index,
            label: button.label
        };
        localStorage.setItem(this.specialKey + '_pinned_creation_option', JSON.stringify(button));
    }
    pinButton() {
        this.selected.emit(this.selected_option);
    }
    populateMenu() {
        let count = 0;
        for (let option of this.options) {
            this.buttons.push({ index: count, label: option });
            count += 1;
        }
    }
    defaultSelectedOption() {
        let local_storage_item = localStorage.getItem(this.specialKey + '_pinned_creation_option');
        return local_storage_item ? JSON.parse(local_storage_item) : this.buttons[0];
    }
}
PinOptionButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-pin-option-button',
                template: `<button mat-flat-button class="pin-button-round"
    [ngClass]="jamColor === 'default' ? 'mat-hint' : null"
    [color]="jamColor"
    (click)="selected.emit(selected_option)">
    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="4px">
        <button mat-icon-button class="mat-button">
            <mat-icon>add_circle</mat-icon>
        </button>

        <span>{{ selected_option?.label }}</span>

        <button mat-icon-button matSuffix class="mat-button"
            [matMenuTriggerFor]="jamPinOptionButton"
            (click)="$event.stopPropagation()">
            <mat-icon>arrow_drop_down</mat-icon>
        </button>
    </div>
</button>

<mat-menu #jamPinOptionButton="matMenu">
    <button mat-menu-item class="mouseover" *ngFor="let button of buttons; let item = index"
        (click)="selected.emit(button)">
        <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="16px">
            <span>{{ button.label }}</span>
            <div class="pin-container">
                <button mat-icon-button
                    [ngClass]="selected_option?.index !== item ? 'mouseover-child mat-button' : 'mat-button'"
                    (click)="pinnedOption($event, button)">
                    <mat-icon svgIcon="pin_rs" color="accent"
                        [ngStyle]="{ color: selected_option.index !== item ? '#000000B3' : null }"
                    ></mat-icon>
                </button>
            </div>
        </div>
    </button>
</mat-menu>
`,
                styles: [`button.pin-button-round{background-color:rgba(0,0,0,.102)!important;padding:0;border-radius:50px}.pin-container{width:40px}.pin-container button mat-icon{margin:0}.mouseover * .mouseover-child{display:none}.mouseover:hover * .mouseover-child{display:inherit}`]
            },] },
];
/** @nocollapse */
PinOptionButtonComponent.ctorParameters = () => [
    { type: MatIconRegistry },
    { type: DomSanitizer }
];
PinOptionButtonComponent.propDecorators = {
    options: [{ type: Input }],
    specialKey: [{ type: Input }],
    jamColor: [{ type: Input }],
    selected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluLW9wdGlvbi1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvcGluLW9wdGlvbi1idXR0b24vcGluLW9wdGlvbi1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQWdEekQsTUFBTSxPQUFPLHdCQUF3QjtJQVdqQyxZQUNZLGVBQWdDLEVBQ2hDLFlBQTBCO1FBRDFCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVZ0QixhQUFRLEdBQThDLFNBQVMsQ0FBQztRQUUvRCxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUdwRCxZQUFPLEdBQXNCLEVBQUUsQ0FBQztJQU1wQyxDQUFDO0lBRUcsUUFBUTtRQUNYLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFDLDZCQUE2QixDQUFDLENBQ2xGLENBQUM7SUFDTixDQUFDO0lBRU0sWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFrQjtRQUN6QyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLGVBQWUsR0FBRztZQUNuQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1NBQ3RCLENBQUM7UUFFRixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcseUJBQXlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTSxTQUFTO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTyxZQUFZO1FBQ2hCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVkLEtBQUssSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbkQsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNkO0lBQ0wsQ0FBQztJQUVPLHFCQUFxQjtRQUN6QixJQUFJLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO1FBRTNGLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDOzs7WUE5RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0NiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLG9RQUFvUSxDQUFDO2FBQ2pSOzs7O1lBaERRLGVBQWU7WUFDZixZQUFZOzs7c0JBaURoQixLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0SWNvblJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBpbkJ1dHRvbiB7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBsYWJlbDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1waW4tb3B0aW9uLWJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGA8YnV0dG9uIG1hdC1mbGF0LWJ1dHRvbiBjbGFzcz1cInBpbi1idXR0b24tcm91bmRcIlxuICAgIFtuZ0NsYXNzXT1cImphbUNvbG9yID09PSAnZGVmYXVsdCcgPyAnbWF0LWhpbnQnIDogbnVsbFwiXG4gICAgW2NvbG9yXT1cImphbUNvbG9yXCJcbiAgICAoY2xpY2spPVwic2VsZWN0ZWQuZW1pdChzZWxlY3RlZF9vcHRpb24pXCI+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjRweFwiPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1idXR0b25cIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5hZGRfY2lyY2xlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPHNwYW4+e3sgc2VsZWN0ZWRfb3B0aW9uPy5sYWJlbCB9fTwvc3Bhbj5cblxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggY2xhc3M9XCJtYXQtYnV0dG9uXCJcbiAgICAgICAgICAgIFttYXRNZW51VHJpZ2dlckZvcl09XCJqYW1QaW5PcHRpb25CdXR0b25cIlxuICAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmFycm93X2Ryb3BfZG93bjwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9idXR0b24+XG5cbjxtYXQtbWVudSAjamFtUGluT3B0aW9uQnV0dG9uPVwibWF0TWVudVwiPlxuICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSBjbGFzcz1cIm1vdXNlb3ZlclwiICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9uczsgbGV0IGl0ZW0gPSBpbmRleFwiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RlZC5lbWl0KGJ1dHRvbilcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgICAgICAgICAgPHNwYW4+e3sgYnV0dG9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBpbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJzZWxlY3RlZF9vcHRpb24/LmluZGV4ICE9PSBpdGVtID8gJ21vdXNlb3Zlci1jaGlsZCBtYXQtYnV0dG9uJyA6ICdtYXQtYnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJwaW5uZWRPcHRpb24oJGV2ZW50LCBidXR0b24pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBzdmdJY29uPVwicGluX3JzXCIgY29sb3I9XCJhY2NlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyBjb2xvcjogc2VsZWN0ZWRfb3B0aW9uLmluZGV4ICE9PSBpdGVtID8gJyMwMDAwMDBCMycgOiBudWxsIH1cIlxuICAgICAgICAgICAgICAgICAgICA+PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbjwvbWF0LW1lbnU+XG5gLFxuICAgIHN0eWxlczogW2BidXR0b24ucGluLWJ1dHRvbi1yb3VuZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEwMikhaW1wb3J0YW50O3BhZGRpbmc6MDtib3JkZXItcmFkaXVzOjUwcHh9LnBpbi1jb250YWluZXJ7d2lkdGg6NDBweH0ucGluLWNvbnRhaW5lciBidXR0b24gbWF0LWljb257bWFyZ2luOjB9Lm1vdXNlb3ZlciAqIC5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTpub25lfS5tb3VzZW92ZXI6aG92ZXIgKiAubW91c2VvdmVyLWNoaWxke2Rpc3BsYXk6aW5oZXJpdH1gXVxufSlcbmV4cG9ydCBjbGFzcyBQaW5PcHRpb25CdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25zOiBBcnJheTxzdHJpbmc+O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzcGVjaWFsS2V5OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGphbUNvbG9yOiAncHJpbWFyeScgfCAnYWNjZW50JyB8ICd3YXJuJyB8ICdkZWZhdWx0JyA9ICdkZWZhdWx0JztcblxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPElQaW5CdXR0b24+KCk7XG5cbiAgICBwdWJsaWMgaW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgYnV0dG9uczogQXJyYXk8SVBpbkJ1dHRvbj4gPSBbXTtcbiAgICBwdWJsaWMgc2VsZWN0ZWRfb3B0aW9uOiBJUGluQnV0dG9uO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG1hdEljb25SZWdpc3RyeTogTWF0SWNvblJlZ2lzdHJ5LFxuICAgICAgICBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICAgKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBvcHVsYXRlTWVudSgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkX29wdGlvbiA9IHRoaXMuZGVmYXVsdFNlbGVjdGVkT3B0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5tYXRJY29uUmVnaXN0cnkuYWRkU3ZnSWNvblNldChcbiAgICAgICAgICAgIHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnYXNzZXRzL2FsbF9jdXN0b21faWNvbnMuc3ZnJylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGlubmVkT3B0aW9uKGV2ZW50LCBidXR0b246IElQaW5CdXR0b24pOiB2b2lkIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZF9vcHRpb24gPSB7XG4gICAgICAgICAgICBpbmRleDogYnV0dG9uLmluZGV4LFxuICAgICAgICAgICAgbGFiZWw6IGJ1dHRvbi5sYWJlbFxuICAgICAgICB9O1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc3BlY2lhbEtleSArICdfcGlubmVkX2NyZWF0aW9uX29wdGlvbicsIEpTT04uc3RyaW5naWZ5KGJ1dHRvbikpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwaW5CdXR0b24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLnNlbGVjdGVkX29wdGlvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZU1lbnUoKTogdm9pZCB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5idXR0b25zLnB1c2goeyBpbmRleDogY291bnQsIGxhYmVsOiBvcHRpb24gfSk7XG4gICAgICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0U2VsZWN0ZWRPcHRpb24oKTogSVBpbkJ1dHRvbiB7XG4gICAgICAgIGxldCBsb2NhbF9zdG9yYWdlX2l0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnNwZWNpYWxLZXkgKyAnX3Bpbm5lZF9jcmVhdGlvbl9vcHRpb24nKTtcblxuICAgICAgICByZXR1cm4gbG9jYWxfc3RvcmFnZV9pdGVtID8gSlNPTi5wYXJzZShsb2NhbF9zdG9yYWdlX2l0ZW0pIDogdGhpcy5idXR0b25zWzBdO1xuICAgIH1cbn1cbiJdfQ==