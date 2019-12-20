/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class SingleWarningComponent {
    constructor() {
        this.actionButtonClick = new EventEmitter();
        this.actionIconButtonClick = new EventEmitter();
        this.custom_styles = {};
    }
    ngOnInit() {
        if (this.backgroundColor) {
            this.custom_styles['background-color'] = this.backgroundColor;
        }
        if (this.textColor) {
            this.custom_styles.color = this.textColor;
        }
    }
}
SingleWarningComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-single-warning',
                template: `<mat-card class="mat-card-flat yellow-bg-400 width-100"
    *ngIf="message"
    [ngStyle]="custom_styles"
>
    <span>{{ message }}</span>
    <a
        [routerLink]="link"
        [queryParams]="linkQueryParams || {}"
        *ngIf="link"
        >
        {{ linkText || 'Más información' }}
    </a>
    <a
        [href]="externalLink"
        target="_blank"
        *ngIf="externalLink"
        >
        {{ linkText || 'Más información' }}
    </a>

    <button
        *ngIf="actionButtonText"
        mat-button
        type="button"
        name="button"
        (click)="actionButtonClick.emit()"
        >
        {{ actionButtonText }}
    </button>
    <button
        *ngIf="actionIconButton"
        mat-icon-button
        [matTooltip]="actionIconButtonTooltip"
        type="button"
        name="button"
        (click)="actionIconButtonClick.emit()"
        >
        <mat-icon>
            {{ actionIconButton }}
        </mat-icon>
    </button>
</mat-card>
`,
                styles: [`.yellow-bg-400{box-sizing:border-box;background:#ffee58;color:#212121}`]
            },] },
];
SingleWarningComponent.propDecorators = {
    message: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    textColor: [{ type: Input }],
    link: [{ type: Input }],
    linkQueryParams: [{ type: Input }],
    externalLink: [{ type: Input }],
    linkText: [{ type: Input }],
    actionButtonText: [{ type: Input }],
    actionIconButton: [{ type: Input }],
    actionIconButtonTooltip: [{ type: Input }],
    actionButtonClick: [{ type: Output }],
    actionIconButtonClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLXdhcm5pbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvdG9wLXdhcm5pbmcvc2luZ2xlLXdhcm5pbmcvc2luZ2xlLXdhcm5pbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQWlEL0UsTUFBTSxPQUFPLHNCQUFzQjtJQS9DbkM7UUEwRHFCLHNCQUFpQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2pFLDBCQUFxQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRS9FLGtCQUFhLEdBR2hCLEVBQUUsQ0FBQztJQVdYLENBQUM7SUFUVSxRQUFRO1FBQ1gsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDN0M7SUFDTCxDQUFDOzs7WUF6RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMENiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLHdFQUF3RSxDQUFDO2FBQ3JGOzs7c0JBRUksS0FBSzs4QkFDTCxLQUFLO3dCQUNMLEtBQUs7bUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7dUJBQ0wsS0FBSzsrQkFDTCxLQUFLOytCQUNMLEtBQUs7c0NBQ0wsS0FBSztnQ0FDTCxNQUFNO29DQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXNpbmdsZS13YXJuaW5nJyxcbiAgICB0ZW1wbGF0ZTogYDxtYXQtY2FyZCBjbGFzcz1cIm1hdC1jYXJkLWZsYXQgeWVsbG93LWJnLTQwMCB3aWR0aC0xMDBcIlxuICAgICpuZ0lmPVwibWVzc2FnZVwiXG4gICAgW25nU3R5bGVdPVwiY3VzdG9tX3N0eWxlc1wiXG4+XG4gICAgPHNwYW4+e3sgbWVzc2FnZSB9fTwvc3Bhbj5cbiAgICA8YVxuICAgICAgICBbcm91dGVyTGlua109XCJsaW5rXCJcbiAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cImxpbmtRdWVyeVBhcmFtcyB8fCB7fVwiXG4gICAgICAgICpuZ0lmPVwibGlua1wiXG4gICAgICAgID5cbiAgICAgICAge3sgbGlua1RleHQgfHwgJ03DoXMgaW5mb3JtYWNpw7NuJyB9fVxuICAgIDwvYT5cbiAgICA8YVxuICAgICAgICBbaHJlZl09XCJleHRlcm5hbExpbmtcIlxuICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAqbmdJZj1cImV4dGVybmFsTGlua1wiXG4gICAgICAgID5cbiAgICAgICAge3sgbGlua1RleHQgfHwgJ03DoXMgaW5mb3JtYWNpw7NuJyB9fVxuICAgIDwvYT5cblxuICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJhY3Rpb25CdXR0b25UZXh0XCJcbiAgICAgICAgbWF0LWJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgbmFtZT1cImJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJhY3Rpb25CdXR0b25DbGljay5lbWl0KClcIlxuICAgICAgICA+XG4gICAgICAgIHt7IGFjdGlvbkJ1dHRvblRleHQgfX1cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uXG4gICAgICAgICpuZ0lmPVwiYWN0aW9uSWNvbkJ1dHRvblwiXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICBbbWF0VG9vbHRpcF09XCJhY3Rpb25JY29uQnV0dG9uVG9vbHRpcFwiXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBuYW1lPVwiYnV0dG9uXCJcbiAgICAgICAgKGNsaWNrKT1cImFjdGlvbkljb25CdXR0b25DbGljay5lbWl0KClcIlxuICAgICAgICA+XG4gICAgICAgIDxtYXQtaWNvbj5cbiAgICAgICAgICAgIHt7IGFjdGlvbkljb25CdXR0b24gfX1cbiAgICAgICAgPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbjwvbWF0LWNhcmQ+XG5gLFxuICAgIHN0eWxlczogW2AueWVsbG93LWJnLTQwMHtib3gtc2l6aW5nOmJvcmRlci1ib3g7YmFja2dyb3VuZDojZmZlZTU4O2NvbG9yOiMyMTIxMjF9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2luZ2xlV2FybmluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRleHRDb2xvcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsaW5rOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGxpbmtRdWVyeVBhcmFtczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gICAgQElucHV0KCkgcHVibGljIGV4dGVybmFsTGluazogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsaW5rVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBhY3Rpb25CdXR0b25UZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGFjdGlvbkljb25CdXR0b246IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgYWN0aW9uSWNvbkJ1dHRvblRvb2x0aXA6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgcHVibGljIGFjdGlvbkJ1dHRvbkNsaWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBhY3Rpb25JY29uQnV0dG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIHB1YmxpYyBjdXN0b21fc3R5bGVzOiB7XG4gICAgICAgIGNvbG9yPzogc3RyaW5nO1xuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic/OiBzdHJpbmc7XG4gICAgfSA9IHt9O1xuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5iYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tX3N0eWxlc1snYmFja2dyb3VuZC1jb2xvciddID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGV4dENvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbV9zdHlsZXMuY29sb3IgPSB0aGlzLnRleHRDb2xvcjtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19