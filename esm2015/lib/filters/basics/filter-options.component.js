/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, EventEmitter, Output } from '@angular/core';
export class JamFilterOptionsComponent {
    constructor() {
        this.remoteFilterChange = new EventEmitter();
    }
    ngOnInit() {
        this.filterConfigArray = Object.keys(this.filterConfig.options).map(key => {
            this.filterConfig.options[key].text = { key: key, name: this.filterConfig.options[key].text };
            return this.filterConfig.options[key];
        });
    }
    optionSelected(jsonvalue, filter_list) {
        this.remoteFilter[this.filterConfig.attribute] = filter_list.toString();
        this.remoteFilterChange.emit(this.remoteFilter);
    }
}
JamFilterOptionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-filter-options',
                template: `<mat-form-field color="primary" floatLabel="never">
    <mat-select
        [(ngModel)]="filterConfig.selected"
        [placeholder]="filterConfig.title">
        <mat-option *ngFor="let config of filterConfigArray"
            [value]="config.text.key"
            (click)="optionSelected(config, filterConfig.selected)">{{ config.text.name }}
        </mat-option>
    </mat-select>
</mat-form-field>
`
            },] },
];
JamFilterOptionsComponent.propDecorators = {
    filterConfig: [{ type: Input }],
    remoteFilter: [{ type: Input }],
    remoteFilterChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLW9wdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmlsdGVycy9iYXNpY3MvZmlsdGVyLW9wdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWtCL0UsTUFBTSxPQUFPLHlCQUF5QjtJQWR0QztRQWlCcUIsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQWdCbEUsQ0FBQztJQVpVLFFBQVE7UUFDWCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU5RixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGNBQWMsQ0FBQyxTQUFTLEVBQUUsV0FBVztRQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7OztZQWhDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0NBVWI7YUFDQTs7OzJCQUVJLEtBQUs7MkJBQ0wsS0FBSztpQ0FDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTcgUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZpbHRlck9wdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvZmlsdGVyLW9wdGlvbi5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1maWx0ZXItb3B0aW9ucycsXG4gICAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgY29sb3I9XCJwcmltYXJ5XCIgZmxvYXRMYWJlbD1cIm5ldmVyXCI+XG4gICAgPG1hdC1zZWxlY3RcbiAgICAgICAgWyhuZ01vZGVsKV09XCJmaWx0ZXJDb25maWcuc2VsZWN0ZWRcIlxuICAgICAgICBbcGxhY2Vob2xkZXJdPVwiZmlsdGVyQ29uZmlnLnRpdGxlXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjb25maWcgb2YgZmlsdGVyQ29uZmlnQXJyYXlcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImNvbmZpZy50ZXh0LmtleVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib3B0aW9uU2VsZWN0ZWQoY29uZmlnLCBmaWx0ZXJDb25maWcuc2VsZWN0ZWQpXCI+e3sgY29uZmlnLnRleHQubmFtZSB9fVxuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0PlxuPC9tYXQtZm9ybS1maWVsZD5cbmBcbn0pXG5leHBvcnQgY2xhc3MgSmFtRmlsdGVyT3B0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIGZpbHRlckNvbmZpZzogRmlsdGVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZW1vdGVGaWx0ZXI6IG9iamVjdDtcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlbW90ZUZpbHRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgcHVibGljIGZpbHRlckNvbmZpZ0FycmF5OiBBcnJheTxGaWx0ZXJPcHRpb24+O1xuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZpbHRlckNvbmZpZ0FycmF5ID0gT2JqZWN0LmtleXModGhpcy5maWx0ZXJDb25maWcub3B0aW9ucykubWFwKGtleSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV0udGV4dCA9IHsga2V5OiBrZXksIG5hbWU6IHRoaXMuZmlsdGVyQ29uZmlnLm9wdGlvbnNba2V5XS50ZXh0IH07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlckNvbmZpZy5vcHRpb25zW2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcHRpb25TZWxlY3RlZChqc29udmFsdWUsIGZpbHRlcl9saXN0KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3RlRmlsdGVyW3RoaXMuZmlsdGVyQ29uZmlnLmF0dHJpYnV0ZV0gPSBmaWx0ZXJfbGlzdC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnJlbW90ZUZpbHRlckNoYW5nZS5lbWl0KHRoaXMucmVtb3RlRmlsdGVyKTtcbiAgICB9XG59XG4iXX0=