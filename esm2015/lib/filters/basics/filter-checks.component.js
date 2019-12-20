import { Component, Input, Output, EventEmitter } from '@angular/core';
export class JamFilterChecksComponent {
    constructor() {
        this.filterConfigChange = new EventEmitter();
        this.remoteFilterChange = new EventEmitter();
        this.searchText = '';
        this.show_input_search = false;
    }
    ngOnInit() {
        if (this.filterConfig.selected.length !== 0) {
            this.remoteFilter[this.filterConfig.attribute] = this.filterConfig.selected;
        }
        this.filterConfigOptionsUpdate();
        this.filter_config_options = this.filter_config_options.sort((a, b) => a.text.name.localeCompare(b.text.name));
        this.showInputSearch();
    }
    showInputSearch() {
        if (Object.keys(this.filterConfig.options).length > 10) {
            this.show_input_search = true;
        }
    }
    filterConfigOptionsUpdate() {
        this.filter_config_options = Object.keys(this.filterConfig.options).map(key => {
            if (typeof this.filterConfig.options[key].text === 'string') {
                this.filterConfig.options[key].text = { key: key, name: this.filterConfig.options[key].text };
            }
            return this.filterConfig.options[key];
        });
    }
    clearSelected() {
        this.filterConfig.selected = [];
    }
    optionSelected(jsonvalue, filter_list) {
        this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
        this.remoteFilterChange.emit(this.remoteFilter);
    }
}
JamFilterChecksComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-filter-checks',
                template: `<mat-form-field color="primary" floatLabel="never">
    <mat-select
        multiple
        [(ngModel)]="filterConfig.selected"
        (focus)="filterConfigOptionsUpdate()"
        [placeholder]="filterConfig.title">
        <div mat-menu-item class="focus-element-4dp reset-input-default"
            *ngIf="filter_config_options.length > 10"
            fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10"
            (click)="$event.stopPropagation()">
            <mat-icon>search</mat-icon>
            <input fxFlex class="rs-input" tabindex="1" autofocus placeholder="Buscar"
                [(ngModel)]="searchText">
            <div style="height: 24px; width: 24px" fxLayout="row" fxLayoutAlign="start center">
                <mat-icon *ngIf="searchText" (click)="searchText = ''">clear</mat-icon>
            </div>
        </div>
        <mat-divider></mat-divider>
        <mat-option *ngFor="let option of filter_config_options | filter: searchText"
            [value]="option.text.key"
            (click)="optionSelected(option, filterConfig.selected)">{{ option.text.name }}
        </mat-option>
    </mat-select>
</mat-form-field>
`
            },] },
];
JamFilterChecksComponent.propDecorators = {
    filterConfig: [{ type: Input }],
    remoteFilter: [{ type: Input }],
    filterConfigChange: [{ type: Output }],
    remoteFilterChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNoZWNrcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9maWx0ZXJzL2Jhc2ljcy9maWx0ZXItY2hlY2tzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBcUMvRSxNQUFNLE9BQU8sd0JBQXdCO0lBNUJyQztRQWdDcUIsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM3Qyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSXZELGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO0lBdUM5QyxDQUFDO0lBckNVLFFBQVE7UUFDWCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1NBQy9FO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ3hELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQVcsQ0FBQyxDQUFDLElBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFXLENBQUMsQ0FBQyxJQUFLLENBQUMsSUFBSSxDQUFDLENBQ3pFLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVNLHlCQUF5QjtRQUM1QixJQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxRSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakc7WUFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGFBQWE7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxjQUFjLENBQUMsU0FBUyxFQUFFLFdBQVc7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7WUE1RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0JiO2FBQ0E7OzsyQkFFSSxLQUFLOzJCQUNMLEtBQUs7aUNBRUwsTUFBTTtpQ0FDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyQ2hlY2tzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXItY2hlY2tzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGaWx0ZXJPcHRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ZpbHRlci1vcHRpb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWZpbHRlci1jaGVja3MnLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIGNvbG9yPVwicHJpbWFyeVwiIGZsb2F0TGFiZWw9XCJuZXZlclwiPlxuICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIG11bHRpcGxlXG4gICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyQ29uZmlnLnNlbGVjdGVkXCJcbiAgICAgICAgKGZvY3VzKT1cImZpbHRlckNvbmZpZ09wdGlvbnNVcGRhdGUoKVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJmaWx0ZXJDb25maWcudGl0bGVcIj5cbiAgICAgICAgPGRpdiBtYXQtbWVudS1pdGVtIGNsYXNzPVwiZm9jdXMtZWxlbWVudC00ZHAgcmVzZXQtaW5wdXQtZGVmYXVsdFwiXG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlcl9jb25maWdfb3B0aW9ucy5sZW5ndGggPiAxMFwiXG4gICAgICAgICAgICBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjEwXCJcbiAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPGlucHV0IGZ4RmxleCBjbGFzcz1cInJzLWlucHV0XCIgdGFiaW5kZXg9XCIxXCIgYXV0b2ZvY3VzIHBsYWNlaG9sZGVyPVwiQnVzY2FyXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInNlYXJjaFRleHRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDI0cHg7IHdpZHRoOiAyNHB4XCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwic2VhcmNoVGV4dFwiIChjbGljayk9XCJzZWFyY2hUZXh0ID0gJydcIj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlcl9jb25maWdfb3B0aW9ucyB8IGZpbHRlcjogc2VhcmNoVGV4dFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnRleHQua2V5XCJcbiAgICAgICAgICAgIChjbGljayk9XCJvcHRpb25TZWxlY3RlZChvcHRpb24sIGZpbHRlckNvbmZpZy5zZWxlY3RlZClcIj57eyBvcHRpb24udGV4dC5uYW1lIH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Q+XG48L21hdC1mb3JtLWZpZWxkPlxuYFxufSlcbmV4cG9ydCBjbGFzcyBKYW1GaWx0ZXJDaGVja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmaWx0ZXJDb25maWc6IEZpbHRlckNoZWNrcztcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyOiBvYmplY3Q7XG5cbiAgICBAT3V0cHV0KCkgcHVibGljIGZpbHRlckNvbmZpZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVtb3RlRmlsdGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBwdWJsaWMgZmlsdGVyX2NvbmZpZ19vcHRpb25zOiBBcnJheTxGaWx0ZXJPcHRpb24+O1xuXG4gICAgcHVibGljIHNlYXJjaFRleHQ6IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBzaG93X2lucHV0X3NlYXJjaDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJDb25maWcuc2VsZWN0ZWQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZUZpbHRlclt0aGlzLmZpbHRlckNvbmZpZy5hdHRyaWJ1dGVdID0gdGhpcy5maWx0ZXJDb25maWcuc2VsZWN0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWx0ZXJDb25maWdPcHRpb25zVXBkYXRlKCk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJfY29uZmlnX29wdGlvbnMgPSB0aGlzLmZpbHRlcl9jb25maWdfb3B0aW9ucy5zb3J0KFxuICAgICAgICAgICAgKGEsIGIpID0+ICg8SU9wdGlvbj5hLnRleHQpLm5hbWUubG9jYWxlQ29tcGFyZSgoPElPcHRpb24+Yi50ZXh0KS5uYW1lKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2hvd0lucHV0U2VhcmNoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dJbnB1dFNlYXJjaCgpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dfaW5wdXRfc2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmaWx0ZXJDb25maWdPcHRpb25zVXBkYXRlKCkge1xuICAgICAgICB0aGlzLmZpbHRlcl9jb25maWdfb3B0aW9ucyA9IE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCA9IHsga2V5OiBrZXksIG5hbWU6IHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnNba2V5XS50ZXh0IH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclNlbGVjdGVkKCkge1xuICAgICAgICB0aGlzLmZpbHRlckNvbmZpZy5zZWxlY3RlZCA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcHRpb25TZWxlY3RlZChqc29udmFsdWUsIGZpbHRlcl9saXN0KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3RlRmlsdGVyW3RoaXMuZmlsdGVyQ29uZmlnLmF0dHJpYnV0ZV0gPSBmaWx0ZXJfbGlzdC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnJlbW90ZUZpbHRlckNoYW5nZS5lbWl0KHRoaXMucmVtb3RlRmlsdGVyKTtcbiAgICB9XG59XG4iXX0=