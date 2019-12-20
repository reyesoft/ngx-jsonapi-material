import { Component, Input, HostListener } from '@angular/core';
import { TopWarningService } from './top-warning.service';
export class TopWarningComponent {
    constructor(topWarningService) {
        this.topWarningService = topWarningService;
        this.opened = true;
        this.button_state = 'standby';
        this.button_icons = {
            expanded: 'keyboard_arrow_down',
            contracted: 'keyboard_arrow_up',
            standby: 'remove'
        };
        this.defaultAccordionState();
    }
    onMouseEnter() {
        this.opened ? this.button_state = 'contracted' : this.button_state = 'expanded';
    }
    onMouseLeave() {
        this.button_state = 'standby';
    }
    toggleOpenAccordion(opened) {
        this.opened = opened;
        localStorage.setItem('opened', this.opened.toString());
    }
    defaultAccordionState() {
        this.opened = localStorage.getItem('opened') === 'false' ? false : true;
    }
}
TopWarningComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-top-warning',
                template: `<mat-accordion *ngIf="topWarningService.warnings.length > 0">
    <mat-expansion-panel id="rsTopWarning" class="yellow-bg-400"
        [expanded]="opened"
        [ngClass]="opened ? 'hidden-header' : ''"
        [hideToggle]="true"
        (expandedChange)="toggleOpenAccordion($event)">
        <mat-expansion-panel-header *ngIf="!opened">
            <mat-panel-description fxLayout="column" fxLayoutAlign="end center">
                <mat-icon>{{ button_icons[button_state] }}</mat-icon>
            </mat-panel-description>
        </mat-expansion-panel-header>
        <div fxLayout="column" class="text-center">
            <div *ngFor="let warn of topWarningService.warnings">
                <jam-single-warning
                    [message]="warn.attributes.message"
                    [link]="warn.attributes.link"
                    [linkQueryParams]="warn.attributes.linkQueryParams"
                    [externalLink]="warn.attributes.externalLink"
                    [linkText]="warn.attributes.linkText"
                    >
                </jam-single-warning>
                <mat-divider></mat-divider>
            </div>
            <div [style.cursor]="'pointer'" class="action-button" fxLayout="column" fxLayoutAlign="center center"
                (click)="opened = false">
                <button mat-icon-button>
                    <mat-icon *ngIf="opened"
                    >{{ button_icons[button_state] }}</mat-icon>
                </button>
            </div>
        </div>
    </mat-expansion-panel>
</mat-accordion>
`,
                styles: [`.yellow-bg-400{background:#ffee58}.overlay{z-index:999}.text-center{text-align:center}mat-expansion-panel-header{height:15px!important}:host /deep/ .mat-expansion-panel-body{padding-bottom:0}mat-divider{border-color:#fbc02d!important}mat-icon{color:#757575}.action-button{height:24px}`]
            },] },
];
/** @nocollapse */
TopWarningComponent.ctorParameters = () => [
    { type: TopWarningService }
];
TopWarningComponent.propDecorators = {
    opened: [{ type: Input }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLXdhcm5pbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvdG9wLXdhcm5pbmcvdG9wLXdhcm5pbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQXdDMUQsTUFBTSxPQUFPLG1CQUFtQjtJQVM1QixZQUEwQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVI5QyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGlCQUFZLEdBQTBDLFNBQVMsQ0FBQztRQUNoRSxpQkFBWSxHQUFHO1lBQ2xCLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixPQUFPLEVBQUUsUUFBUTtTQUNwQixDQUFDO1FBR0UsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUdNLFlBQVk7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7SUFDcEYsQ0FBQztJQUdNLFlBQVk7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sbUJBQW1CLENBQUMsTUFBZTtRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLHFCQUFxQjtRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1RSxDQUFDOzs7WUFwRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaUNiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLDhSQUE4UixDQUFDO2FBQzNTOzs7O1lBdkNRLGlCQUFpQjs7O3FCQXlDckIsS0FBSzsyQkFZTCxZQUFZLFNBQUMsWUFBWTsyQkFLekIsWUFBWSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvcFdhcm5pbmdTZXJ2aWNlIH0gZnJvbSAnLi90b3Atd2FybmluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tdG9wLXdhcm5pbmcnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1hY2NvcmRpb24gKm5nSWY9XCJ0b3BXYXJuaW5nU2VydmljZS53YXJuaW5ncy5sZW5ndGggPiAwXCI+XG4gICAgPG1hdC1leHBhbnNpb24tcGFuZWwgaWQ9XCJyc1RvcFdhcm5pbmdcIiBjbGFzcz1cInllbGxvdy1iZy00MDBcIlxuICAgICAgICBbZXhwYW5kZWRdPVwib3BlbmVkXCJcbiAgICAgICAgW25nQ2xhc3NdPVwib3BlbmVkID8gJ2hpZGRlbi1oZWFkZXInIDogJydcIlxuICAgICAgICBbaGlkZVRvZ2dsZV09XCJ0cnVlXCJcbiAgICAgICAgKGV4cGFuZGVkQ2hhbmdlKT1cInRvZ2dsZU9wZW5BY2NvcmRpb24oJGV2ZW50KVwiPlxuICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXIgKm5nSWY9XCIhb3BlbmVkXCI+XG4gICAgICAgICAgICA8bWF0LXBhbmVsLWRlc2NyaXB0aW9uIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+e3sgYnV0dG9uX2ljb25zW2J1dHRvbl9zdGF0ZV0gfX08L21hdC1pY29uPlxuICAgICAgICAgICAgPC9tYXQtcGFuZWwtZGVzY3JpcHRpb24+XG4gICAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCB3YXJuIG9mIHRvcFdhcm5pbmdTZXJ2aWNlLndhcm5pbmdzXCI+XG4gICAgICAgICAgICAgICAgPGphbS1zaW5nbGUtd2FybmluZ1xuICAgICAgICAgICAgICAgICAgICBbbWVzc2FnZV09XCJ3YXJuLmF0dHJpYnV0ZXMubWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgIFtsaW5rXT1cIndhcm4uYXR0cmlidXRlcy5saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgW2xpbmtRdWVyeVBhcmFtc109XCJ3YXJuLmF0dHJpYnV0ZXMubGlua1F1ZXJ5UGFyYW1zXCJcbiAgICAgICAgICAgICAgICAgICAgW2V4dGVybmFsTGlua109XCJ3YXJuLmF0dHJpYnV0ZXMuZXh0ZXJuYWxMaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgW2xpbmtUZXh0XT1cIndhcm4uYXR0cmlidXRlcy5saW5rVGV4dFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L2phbS1zaW5nbGUtd2FybmluZz5cbiAgICAgICAgICAgICAgICA8bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbc3R5bGUuY3Vyc29yXT1cIidwb2ludGVyJ1wiIGNsYXNzPVwiYWN0aW9uLWJ1dHRvblwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvcGVuZWQgPSBmYWxzZVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJvcGVuZWRcIlxuICAgICAgICAgICAgICAgICAgICA+e3sgYnV0dG9uX2ljb25zW2J1dHRvbl9zdGF0ZV0gfX08L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbjwvbWF0LWFjY29yZGlvbj5cbmAsXG4gICAgc3R5bGVzOiBbYC55ZWxsb3ctYmctNDAwe2JhY2tncm91bmQ6I2ZmZWU1OH0ub3ZlcmxheXt6LWluZGV4Ojk5OX0udGV4dC1jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7aGVpZ2h0OjE1cHghaW1wb3J0YW50fTpob3N0IC9kZWVwLyAubWF0LWV4cGFuc2lvbi1wYW5lbC1ib2R5e3BhZGRpbmctYm90dG9tOjB9bWF0LWRpdmlkZXJ7Ym9yZGVyLWNvbG9yOiNmYmMwMmQhaW1wb3J0YW50fW1hdC1pY29ue2NvbG9yOiM3NTc1NzV9LmFjdGlvbi1idXR0b257aGVpZ2h0OjI0cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgVG9wV2FybmluZ0NvbXBvbmVudCB7XG4gICAgQElucHV0KCkgcHVibGljIG9wZW5lZDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGJ1dHRvbl9zdGF0ZTogJ2V4cGFuZGVkJyB8ICdjb250cmFjdGVkJyB8ICdzdGFuZGJ5JyA9ICdzdGFuZGJ5JztcbiAgICBwdWJsaWMgYnV0dG9uX2ljb25zID0ge1xuICAgICAgICBleHBhbmRlZDogJ2tleWJvYXJkX2Fycm93X2Rvd24nLFxuICAgICAgICBjb250cmFjdGVkOiAna2V5Ym9hcmRfYXJyb3dfdXAnLFxuICAgICAgICBzdGFuZGJ5OiAncmVtb3ZlJ1xuICAgIH07XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHRvcFdhcm5pbmdTZXJ2aWNlOiBUb3BXYXJuaW5nU2VydmljZSkge1xuICAgICAgICB0aGlzLmRlZmF1bHRBY2NvcmRpb25TdGF0ZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICAgIHB1YmxpYyBvbk1vdXNlRW50ZXIoKSB7XG4gICAgICAgIHRoaXMub3BlbmVkID8gdGhpcy5idXR0b25fc3RhdGUgPSAnY29udHJhY3RlZCcgOiB0aGlzLmJ1dHRvbl9zdGF0ZSA9ICdleHBhbmRlZCc7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gICAgcHVibGljIG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5idXR0b25fc3RhdGUgPSAnc3RhbmRieSc7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZU9wZW5BY2NvcmRpb24ob3BlbmVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbmVkID0gb3BlbmVkO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb3BlbmVkJywgdGhpcy5vcGVuZWQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlZmF1bHRBY2NvcmRpb25TdGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb3BlbmVkJykgPT09ICdmYWxzZScgPyBmYWxzZSA6IHRydWU7XG4gICAgfVxufVxuIl19