/** This's component @deprecated */
import { Component, Input } from '@angular/core';
export class FloatingButtonComponent {
}
FloatingButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-floating-button',
                styles: [`a.mat-fab{position:fixed;bottom:24px;right:24px;z-index:333}`],
                template: `<a
    mat-fab href
    *ngIf="show || true"
    [matTooltip]="tooltip"
    matTooltipPosition="before"
    [target]="target || '_self'"
    [routerLink]="rsRouterLink"
    [queryParams]="rsQueryParams">
    <mat-icon style="color: white">{{ iconName ? iconName : 'add' }}</mat-icon>
</a>
`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2Zsb2F0aW5nLWJ1dHRvbi9mbG9hdGluZy1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUVuQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWlCakQsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBZm5DLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixNQUFNLEVBQUUsQ0FBQyw4REFBOEQsQ0FBQztnQkFDeEUsUUFBUSxFQUFFOzs7Ozs7Ozs7O0NBVWI7YUFDQTs7OzJCQUlJLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFRoaXMncyBjb21wb25lbnQgQGRlcHJlY2F0ZWQgKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1mbG9hdGluZy1idXR0b24nLFxuICAgIHN0eWxlczogW2BhLm1hdC1mYWJ7cG9zaXRpb246Zml4ZWQ7Ym90dG9tOjI0cHg7cmlnaHQ6MjRweDt6LWluZGV4OjMzM31gXSxcbiAgICB0ZW1wbGF0ZTogYDxhXG4gICAgbWF0LWZhYiBocmVmXG4gICAgKm5nSWY9XCJzaG93IHx8IHRydWVcIlxuICAgIFttYXRUb29sdGlwXT1cInRvb2x0aXBcIlxuICAgIG1hdFRvb2x0aXBQb3NpdGlvbj1cImJlZm9yZVwiXG4gICAgW3RhcmdldF09XCJ0YXJnZXQgfHwgJ19zZWxmJ1wiXG4gICAgW3JvdXRlckxpbmtdPVwicnNSb3V0ZXJMaW5rXCJcbiAgICBbcXVlcnlQYXJhbXNdPVwicnNRdWVyeVBhcmFtc1wiPlxuICAgIDxtYXQtaWNvbiBzdHlsZT1cImNvbG9yOiB3aGl0ZVwiPnt7IGljb25OYW1lID8gaWNvbk5hbWUgOiAnYWRkJyB9fTwvbWF0LWljb24+XG48L2E+XG5gXG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0aW5nQnV0dG9uQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgc2hvdzogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyByc0JhY2tncm91bmQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgaWNvbk5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgdG9vbHRpcDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0YXJnZXQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgcnNSb3V0ZXJMaW5rOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHJzUXVlcnlQYXJhbXM6IG9iamVjdDtcbn1cbiJdfQ==