import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from './menu-elements/menu';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Destroyer } from '../destroyer';
export class MenuComponent {
    constructor(matBottomSheet) {
        this.matBottomSheet = matBottomSheet;
        this.selected = new EventEmitter();
        this.destroyer = new Destroyer();
    }
    ngOnInit() {
        if (this.menu.main_image && !this.menu.main_image.styles) {
            this.menu.main_image.styles = { 'border-radius': '100px', width: '40px', height: '40px' };
        }
        this.menu.removeEmptySections();
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    open() {
        this.matBottomSheet.open(BottomSheetComponent, {
            data: { sections: this.menu.data }
        })
            .afterDismissed()
            .pipe(this.destroyer.pipe(), filter(response => ![null, undefined, ''].includes(response)))
            .subscribe(response => this.selected.emit(this.formatEmission(response)));
    }
    selectedOption(selected) {
        this.selected.emit(this.formatEmission(selected));
    }
    formatEmission(response) {
        return { key: response, data: this.source_data || null };
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-menu',
                styles: [`/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}`],
                template: `<jam-dropdown-menu
    [sections]="menu.data"
    [main_image]="menu.main_image"
    (selected)="selectedOption($event)"
></jam-dropdown-menu>

<div class="jam-bottom-sheet">
    <button
        mat-icon-button
        class="mat-button mat-icon-button"
        matTooltip="Más"
        fxLayout="row"
        fxLayoutAlign="center center"
        (click)="open()">
        <img *ngIf="menu.main_image?.url" [src]="menu.main_image?.url" [ngStyle]="menu.main_image?.styles"/>
        <mat-icon *ngIf="!menu.main_image?.url">more_vert</mat-icon>
    </button>
</div>
`
            },] },
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [
    { type: MatBottomSheet }
];
MenuComponent.propDecorators = {
    menu: [{ type: Input }],
    source_data: [{ type: Input }],
    selected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9tZW51L21lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUEwQnpDLE1BQU0sT0FBTyxhQUFhO0lBT3RCLFlBQ1ksY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTHpCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBc0MsQ0FBQztRQUU1RSxjQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUloQyxDQUFDO0lBRUcsUUFBUTtRQUNYLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUM3RjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLElBQUk7UUFDUCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUMzQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDckMsQ0FBQzthQUNELGNBQWMsRUFBRTthQUNoQixJQUFJLENBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFDckIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ2hFO2FBQ0EsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLGNBQWMsQ0FBQyxRQUFnQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVPLGNBQWMsQ0FBQyxRQUFnQjtRQUNuQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUM3RCxDQUFDOzs7WUEvREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixNQUFNLEVBQUUsQ0FBQyxvUEFBb1AsQ0FBQztnQkFDOVAsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQmI7YUFDQTs7OztZQTNCUSxjQUFjOzs7bUJBNkJsQixLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZW51IH0gZnJvbSAnLi9tZW51LWVsZW1lbnRzL21lbnUnO1xuaW1wb3J0IHsgU2VjdGlvbiB9IGZyb20gJy4vbWVudS1lbGVtZW50cy9zZWN0aW9uJztcbmltcG9ydCB7IEJvdHRvbVNoZWV0Q29tcG9uZW50IH0gZnJvbSAnLi9ib3R0b20tc2hlZXQvYm90dG9tLXNoZWV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRCb3R0b21TaGVldCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlc3Ryb3llciB9IGZyb20gJy4uL2Rlc3Ryb3llcic7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuL21lbnUtZWxlbWVudHMvYnV0dG9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tbWVudScsXG4gICAgc3R5bGVzOiBbYC9kZWVwLyBoM3tmb250LXNpemU6MTBwdDttYXJnaW46MTZweDtmb250LXdlaWdodDo1MDB9amFtLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpibG9ja30uamFtLWJvdHRvbS1zaGVldHtkaXNwbGF5Om5vbmV9LmRpc2FibGVke29wYWNpdHk6LjV9QG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjU5OXB4KXtqYW0tZHJvcGRvd24tbWVudXtkaXNwbGF5Om5vbmV9LmphbS1ib3R0b20tc2hlZXR7ZGlzcGxheTpibG9ja319YF0sXG4gICAgdGVtcGxhdGU6IGA8amFtLWRyb3Bkb3duLW1lbnVcbiAgICBbc2VjdGlvbnNdPVwibWVudS5kYXRhXCJcbiAgICBbbWFpbl9pbWFnZV09XCJtZW51Lm1haW5faW1hZ2VcIlxuICAgIChzZWxlY3RlZCk9XCJzZWxlY3RlZE9wdGlvbigkZXZlbnQpXCJcbj48L2phbS1kcm9wZG93bi1tZW51PlxuXG48ZGl2IGNsYXNzPVwiamFtLWJvdHRvbS1zaGVldFwiPlxuICAgIDxidXR0b25cbiAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgIGNsYXNzPVwibWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cIlxuICAgICAgICBtYXRUb29sdGlwPVwiTcOhc1wiXG4gICAgICAgIGZ4TGF5b3V0PVwicm93XCJcbiAgICAgICAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuICAgICAgICAoY2xpY2spPVwib3BlbigpXCI+XG4gICAgICAgIDxpbWcgKm5nSWY9XCJtZW51Lm1haW5faW1hZ2U/LnVybFwiIFtzcmNdPVwibWVudS5tYWluX2ltYWdlPy51cmxcIiBbbmdTdHlsZV09XCJtZW51Lm1haW5faW1hZ2U/LnN0eWxlc1wiLz5cbiAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiIW1lbnUubWFpbl9pbWFnZT8udXJsXCI+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtZW51OiBNZW51O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2VfZGF0YTogQXJyYXk8YW55PjtcbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjx7IGtleTogc3RyaW5nOyBkYXRhPzogQXJyYXk8YW55PiB9PigpO1xuXG4gICAgcHVibGljIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtYXRCb3R0b21TaGVldDogTWF0Qm90dG9tU2hlZXRcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lbnUubWFpbl9pbWFnZSAmJiAhdGhpcy5tZW51Lm1haW5faW1hZ2Uuc3R5bGVzKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUubWFpbl9pbWFnZS5zdHlsZXMgPSB7ICdib3JkZXItcmFkaXVzJzogJzEwMHB4Jywgd2lkdGg6ICc0MHB4JywgaGVpZ2h0OiAnNDBweCcgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnUucmVtb3ZlRW1wdHlTZWN0aW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuKCkge1xuICAgICAgICB0aGlzLm1hdEJvdHRvbVNoZWV0Lm9wZW4oQm90dG9tU2hlZXRDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGRhdGE6IHsgc2VjdGlvbnM6IHRoaXMubWVudS5kYXRhIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmFmdGVyRGlzbWlzc2VkKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3llci5waXBlKCksXG4gICAgICAgICAgICBmaWx0ZXIocmVzcG9uc2UgPT4gIVtudWxsLCB1bmRlZmluZWQsICcnXS5pbmNsdWRlcyhyZXNwb25zZSkpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShyZXNwb25zZSA9PiB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5mb3JtYXRFbWlzc2lvbihyZXNwb25zZSkpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRPcHRpb24oc2VsZWN0ZWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5mb3JtYXRFbWlzc2lvbihzZWxlY3RlZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0RW1pc3Npb24ocmVzcG9uc2U6IHN0cmluZykge1xuICAgICAgICByZXR1cm4geyBrZXk6IHJlc3BvbnNlLCBkYXRhOiB0aGlzLnNvdXJjZV9kYXRhIHx8IG51bGwgfTtcbiAgICB9XG59XG4iXX0=