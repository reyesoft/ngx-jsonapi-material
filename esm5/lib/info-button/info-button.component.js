import { Component, Input } from '@angular/core';
var InfoButtonComponent = /** @class */ (function () {
    function InfoButtonComponent() {
        /**
         * @param icon optional property -
         * @description By default acquires as icon "info"
         */
        this.icon = 'info';
        /** @param jamTooltip optional property */
        this.jamTooltip = 'Más información';
    }
    InfoButtonComponent.prototype.ngOnInit = function () {
        this.icon = this.checkIcon();
    };
    /** @method checkIcon Checks arriving icon, if not supported, then returns info. */
    InfoButtonComponent.prototype.checkIcon = function () {
        console.warn("\"" + this.icon + "\" icon is not supported \uD83E\uDD37\u200D\u2642\uFE0F, Try \"info\" or \"help.\"");
        return !['info', 'help'].includes(this.icon) ? 'info' : this.icon;
    };
    InfoButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-info-button',
                    template: "<a class=\"mat-button\" type=\"button\" target=\"_blank\"\n    mat-icon-button\n    [matTooltip]=\"jamTooltip\"\n    [href]=\"externalUrl\"\n    (click)=\"$event.stopPropagation()\"\n>\n    <mat-icon\n        [innerHtml]=\"icon\"\n    ></mat-icon>\n</a>\n"
                },] },
    ];
    InfoButtonComponent.propDecorators = {
        externalUrl: [{ type: Input }],
        icon: [{ type: Input }],
        jamTooltip: [{ type: Input }]
    };
    return InfoButtonComponent;
}());
export { InfoButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvaW5mby1idXR0b24vaW5mby1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpEO0lBQUE7UUFrQkk7OztXQUdHO1FBQ2EsU0FBSSxHQUFvQixNQUFNLENBQUM7UUFFL0MsMENBQTBDO1FBQzFCLGVBQVUsR0FBVyxpQkFBaUIsQ0FBQztJQVkzRCxDQUFDO0lBVlUsc0NBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxtRkFBbUY7SUFDM0UsdUNBQVMsR0FBakI7UUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQUksSUFBSSxDQUFDLElBQUksdUZBQXNELENBQUMsQ0FBQztRQUVsRixPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3RFLENBQUM7O2dCQXBDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGlRQVViO2lCQUNBOzs7OEJBR0ksS0FBSzt1QkFNTCxLQUFLOzZCQUdMLEtBQUs7O0lBWVYsMEJBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQXZCWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0taW5mby1idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgPGEgY2xhc3M9XCJtYXQtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiXG4gICAgbWF0LWljb24tYnV0dG9uXG4gICAgW21hdFRvb2x0aXBdPVwiamFtVG9vbHRpcFwiXG4gICAgW2hyZWZdPVwiZXh0ZXJuYWxVcmxcIlxuICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuPlxuICAgIDxtYXQtaWNvblxuICAgICAgICBbaW5uZXJIdG1sXT1cImljb25cIlxuICAgID48L21hdC1pY29uPlxuPC9hPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBJbmZvQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAvKiogQHBhcmFtIGV4dGVybmFsVXJsIHJlcXVpcmVkIHByb3BlcnR5ICovXG4gICAgQElucHV0KCkgcHVibGljIGV4dGVybmFsVXJsOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaWNvbiBvcHRpb25hbCBwcm9wZXJ0eSAtXG4gICAgICogQGRlc2NyaXB0aW9uIEJ5IGRlZmF1bHQgYWNxdWlyZXMgYXMgaWNvbiBcImluZm9cIlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpY29uOiAnaW5mbycgfCAnaGVscCcgPSAnaW5mbyc7XG5cbiAgICAvKiogQHBhcmFtIGphbVRvb2x0aXAgb3B0aW9uYWwgcHJvcGVydHkgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgamFtVG9vbHRpcDogc3RyaW5nID0gJ03DoXMgaW5mb3JtYWNpw7NuJztcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pY29uID0gdGhpcy5jaGVja0ljb24oKTtcbiAgICB9XG5cbiAgICAvKiogQG1ldGhvZCBjaGVja0ljb24gQ2hlY2tzIGFycml2aW5nIGljb24sIGlmIG5vdCBzdXBwb3J0ZWQsIHRoZW4gcmV0dXJucyBpbmZvLiAqL1xuICAgIHByaXZhdGUgY2hlY2tJY29uKCk6ICdpbmZvJyB8ICdoZWxwJyB7XG4gICAgICAgIGNvbnNvbGUud2FybihgXCIke3RoaXMuaWNvbn1cIiBpY29uIGlzIG5vdCBzdXBwb3J0ZWQg8J+kt+KAjeKZgu+4jywgVHJ5IFwiaW5mb1wiIG9yIFwiaGVscC5cImApO1xuXG4gICAgICAgIHJldHVybiAhWydpbmZvJywgJ2hlbHAnXS5pbmNsdWRlcyh0aGlzLmljb24pID8gJ2luZm8nIDogdGhpcy5pY29uO1xuICAgIH1cbn1cbiJdfQ==