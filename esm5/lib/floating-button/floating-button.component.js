/** This's component @deprecated */
import { Component, Input } from '@angular/core';
var FloatingButtonComponent = /** @class */ (function () {
    function FloatingButtonComponent() {
    }
    FloatingButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-floating-button',
                    styles: ["a.mat-fab{position:fixed;bottom:24px;right:24px;z-index:333}"],
                    template: "<a\n    mat-fab href\n    *ngIf=\"show || true\"\n    [matTooltip]=\"tooltip\"\n    matTooltipPosition=\"before\"\n    [target]=\"target || '_self'\"\n    [routerLink]=\"rsRouterLink\"\n    [queryParams]=\"rsQueryParams\">\n    <mat-icon style=\"color: white\">{{ iconName ? iconName : 'add' }}</mat-icon>\n</a>\n"
                },] },
    ];
    FloatingButtonComponent.propDecorators = {
        rsBackground: [{ type: Input }],
        iconName: [{ type: Input }],
        tooltip: [{ type: Input }],
        target: [{ type: Input }],
        rsRouterLink: [{ type: Input }],
        rsQueryParams: [{ type: Input }]
    };
    return FloatingButtonComponent;
}());
export { FloatingButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2Zsb2F0aW5nLWJ1dHRvbi9mbG9hdGluZy1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRDtJQUFBO0lBd0JBLENBQUM7O2dCQXhCQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsTUFBTSxFQUFFLENBQUMsOERBQThELENBQUM7b0JBQ3hFLFFBQVEsRUFBRSwyVEFVYjtpQkFDQTs7OytCQUlJLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLO3lCQUNMLEtBQUs7K0JBQ0wsS0FBSztnQ0FDTCxLQUFLOztJQUNWLDhCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0FUWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogVGhpcydzIGNvbXBvbmVudCBAZGVwcmVjYXRlZCAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWZsb2F0aW5nLWJ1dHRvbicsXG4gICAgc3R5bGVzOiBbYGEubWF0LWZhYntwb3NpdGlvbjpmaXhlZDtib3R0b206MjRweDtyaWdodDoyNHB4O3otaW5kZXg6MzMzfWBdLFxuICAgIHRlbXBsYXRlOiBgPGFcbiAgICBtYXQtZmFiIGhyZWZcbiAgICAqbmdJZj1cInNob3cgfHwgdHJ1ZVwiXG4gICAgW21hdFRvb2x0aXBdPVwidG9vbHRpcFwiXG4gICAgbWF0VG9vbHRpcFBvc2l0aW9uPVwiYmVmb3JlXCJcbiAgICBbdGFyZ2V0XT1cInRhcmdldCB8fCAnX3NlbGYnXCJcbiAgICBbcm91dGVyTGlua109XCJyc1JvdXRlckxpbmtcIlxuICAgIFtxdWVyeVBhcmFtc109XCJyc1F1ZXJ5UGFyYW1zXCI+XG4gICAgPG1hdC1pY29uIHN0eWxlPVwiY29sb3I6IHdoaXRlXCI+e3sgaWNvbk5hbWUgPyBpY29uTmFtZSA6ICdhZGQnIH19PC9tYXQtaWNvbj5cbjwvYT5cbmBcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdCdXR0b25Db21wb25lbnQge1xuICAgIHB1YmxpYyBzaG93OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcHVibGljIHJzQmFja2dyb3VuZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBpY29uTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0b29sdGlwOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHRhcmdldDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByc1JvdXRlckxpbms6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgcnNRdWVyeVBhcmFtczogb2JqZWN0O1xufVxuIl19