import { Component, Input } from '@angular/core';
export class InfoButtonComponent {
    constructor() {
        /**
         * @param icon optional property -
         * @description By default acquires as icon "info"
         */
        this.icon = 'info';
        /** @param jamTooltip optional property */
        this.jamTooltip = 'Más información';
    }
    ngOnInit() {
        this.icon = this.checkIcon();
    }
    /** @method checkIcon Checks arriving icon, if not supported, then returns info. */
    checkIcon() {
        console.warn(`"${this.icon}" icon is not supported 🤷‍♂️, Try "info" or "help."`);
        return !['info', 'help'].includes(this.icon) ? 'info' : this.icon;
    }
}
InfoButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-info-button',
                template: `<a class="mat-button" type="button" target="_blank"
    mat-icon-button
    [matTooltip]="jamTooltip"
    [href]="externalUrl"
    (click)="$event.stopPropagation()"
>
    <mat-icon
        [innerHtml]="icon"
    ></mat-icon>
</a>
`
            },] },
];
InfoButtonComponent.propDecorators = {
    externalUrl: [{ type: Input }],
    icon: [{ type: Input }],
    jamTooltip: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvaW5mby1idXR0b24vaW5mby1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBZ0J6RCxNQUFNLE9BQU8sbUJBQW1CO0lBZGhDO1FBa0JJOzs7V0FHRztRQUNhLFNBQUksR0FBb0IsTUFBTSxDQUFDO1FBRS9DLDBDQUEwQztRQUMxQixlQUFVLEdBQVcsaUJBQWlCLENBQUM7SUFZM0QsQ0FBQztJQVZVLFFBQVE7UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsbUZBQW1GO0lBQzNFLFNBQVM7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksc0RBQXNELENBQUMsQ0FBQztRQUVsRixPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3RFLENBQUM7OztZQXBDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7O0NBVWI7YUFDQTs7OzBCQUdJLEtBQUs7bUJBTUwsS0FBSzt5QkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWluZm8tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYDxhIGNsYXNzPVwibWF0LWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgIG1hdC1pY29uLWJ1dHRvblxuICAgIFttYXRUb29sdGlwXT1cImphbVRvb2x0aXBcIlxuICAgIFtocmVmXT1cImV4dGVybmFsVXJsXCJcbiAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbj5cbiAgICA8bWF0LWljb25cbiAgICAgICAgW2lubmVySHRtbF09XCJpY29uXCJcbiAgICA+PC9tYXQtaWNvbj5cbjwvYT5cbmBcbn0pXG5leHBvcnQgY2xhc3MgSW5mb0J1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyoqIEBwYXJhbSBleHRlcm5hbFVybCByZXF1aXJlZCBwcm9wZXJ0eSAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBleHRlcm5hbFVybDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGljb24gb3B0aW9uYWwgcHJvcGVydHkgLVxuICAgICAqIEBkZXNjcmlwdGlvbiBCeSBkZWZhdWx0IGFjcXVpcmVzIGFzIGljb24gXCJpbmZvXCJcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbjogJ2luZm8nIHwgJ2hlbHAnID0gJ2luZm8nO1xuXG4gICAgLyoqIEBwYXJhbSBqYW1Ub29sdGlwIG9wdGlvbmFsIHByb3BlcnR5ICovXG4gICAgQElucHV0KCkgcHVibGljIGphbVRvb2x0aXA6IHN0cmluZyA9ICdNw6FzIGluZm9ybWFjacOzbic7XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMuY2hlY2tJY29uKCk7XG4gICAgfVxuXG4gICAgLyoqIEBtZXRob2QgY2hlY2tJY29uIENoZWNrcyBhcnJpdmluZyBpY29uLCBpZiBub3Qgc3VwcG9ydGVkLCB0aGVuIHJldHVybnMgaW5mby4gKi9cbiAgICBwcml2YXRlIGNoZWNrSWNvbigpOiAnaW5mbycgfCAnaGVscCcge1xuICAgICAgICBjb25zb2xlLndhcm4oYFwiJHt0aGlzLmljb259XCIgaWNvbiBpcyBub3Qgc3VwcG9ydGVkIPCfpLfigI3imYLvuI8sIFRyeSBcImluZm9cIiBvciBcImhlbHAuXCJgKTtcblxuICAgICAgICByZXR1cm4gIVsnaW5mbycsICdoZWxwJ10uaW5jbHVkZXModGhpcy5pY29uKSA/ICdpbmZvJyA6IHRoaXMuaWNvbjtcbiAgICB9XG59XG4iXX0=