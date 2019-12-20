import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
var start_time = [0, 0, 0];
var end_time = [23, 59, 59];
var RangeDatepickerComponent = /** @class */ (function () {
    function RangeDatepickerComponent(datePipe) {
        this.datePipe = datePipe;
        this.startDateChange = new EventEmitter();
        this.endDateChange = new EventEmitter();
        this.updateDate = new EventEmitter();
    }
    RangeDatepickerComponent.prototype.ngOnInit = function () {
        this.label = 'Rango de fecha';
    };
    RangeDatepickerComponent.prototype.onDateInput = function (event) {
        this.lastDateInput = event.value;
        this.updateDateChange(this.lastDateInput.begin, this.lastDateInput.end);
    };
    RangeDatepickerComponent.prototype.onDateChange = function (event) {
        this.lastDateChange = event.value;
        this.updateDateChange(this.lastDateChange.begin, this.lastDateChange.end);
    };
    RangeDatepickerComponent.prototype.applyCustomRange = function (event, picker) {
        event.stopPropagation();
        picker.open();
    };
    RangeDatepickerComponent.prototype.applyLastWeek = function () {
        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setDate(this.endDate.getDate() - 6);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    };
    RangeDatepickerComponent.prototype.applyToday = function () {
        this.startDate = this.endDate = new Date();
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    };
    RangeDatepickerComponent.prototype.applyCurrentMonth = function () {
        var today = new Date();
        this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    };
    RangeDatepickerComponent.prototype.clearRange = function (event) {
        event.stopPropagation();
        this.date = null;
        this.updateDateChange(null, null);
        this.label = 'Rango de fecha';
    };
    RangeDatepickerComponent.prototype.applylastMonth = function () {
        var today = new Date();
        this.startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        this.endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    };
    RangeDatepickerComponent.prototype.updateDateChange = function (start_date, end_date) {
        this.startDate = start_date;
        this.endDate = end_date;
        this.label = this.togglePreviewText(start_date, end_date);
        this.startDateChange.emit(this.formatDateAndAddTime(start_date, start_time));
        this.endDateChange.emit(this.formatDateAndAddTime(end_date, end_time));
        this.updateDate.emit();
    };
    RangeDatepickerComponent.prototype.togglePreviewText = function (start_date, end_date) {
        if (start_date && end_date) {
            return this.createPreviewText(start_date, end_date).toUpperCase();
        }
        if (start_date) {
            return this.getDays(start_date).toUpperCase();
        }
        if (end_date) {
            return this.getDays(end_date).toUpperCase();
        }
    };
    RangeDatepickerComponent.prototype.getDays = function (date) {
        var today = new Date();
        if (date.getDate() === today.getDate()) {
            return 'hoy';
        }
        return this.datePipe.transform(date, 'dd MMM yyyy');
    };
    RangeDatepickerComponent.prototype.createPreviewText = function (start_date, end_date) {
        if (start_date.getFullYear() !== end_date.getFullYear()) {
            return (this.datePipe.transform(start_date, 'dd MMM yyyy - ') +
                this.datePipe.transform(end_date, 'dd MMM yyyy'));
        }
        if (start_date.getMonth() === end_date.getMonth()) {
            if (this.compareDaysOfTheSameMonth())
                return this.getDays(start_date);
            return (this.datePipe.transform(start_date, 'dd - ') +
                this.datePipe.transform(end_date, 'dd') +
                this.datePipe.transform(end_date, ' MMM yyyy'));
        }
        return (this.datePipe.transform(start_date, 'dd MMM - ') +
            this.datePipe.transform(end_date, 'dd MMM') +
            this.datePipe.transform(end_date, ' yyyy'));
    };
    RangeDatepickerComponent.prototype.compareDaysOfTheSameMonth = function () {
        if (this.startDate.getDate() === this.endDate.getDate())
            return true;
    };
    RangeDatepickerComponent.prototype.formatDateAndAddTime = function (date, time) {
        date.setHours(time[0], time[1], time[2]);
        return date;
    };
    RangeDatepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-range-datepicker',
                    template: "<mat-form-field [matTooltip]=\"label\">\n    <mat-select [placeholder]=\"label\">\n        <mat-option (click)=\"applyCustomRange($event, resultPicker); $event.stopPropagation()\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n            <sat-datepicker-toggle matPrefix [for]=\"resultPicker\"></sat-datepicker-toggle>\n            <input matInput\n                placeholder=\"Rango personalizado\"\n                #resultPickerModel=\"ngModel\"\n                [satDatepicker]=\"resultPicker\"\n                [(ngModel)]=\"date\"\n                (dateInput)=\"onDateInput($event)\"\n                (dateChange)=\"onDateChange($event)\">\n            <sat-datepicker\n                [disabled]=\"false\"\n                #resultPicker [rangeMode]=\"true\">\n            </sat-datepicker>\n\n            <div matSuffix fxFlex=\"10\">\n                <button mat-icon-button matTooltip=\"Limpiar filtro\" (click)=\"clearRange($event)\">\n                    <mat-icon>clear</mat-icon>\n                </button>\n            </div>\n        </mat-option>\n\n        <mat-option (click)=\"applyToday()\">Hoy</mat-option>\n        <mat-option (click)=\"applyLastWeek()\">\u00DAltima semana</mat-option>\n        <mat-option (click)=\"applyCurrentMonth()\">Este mes</mat-option>\n        <mat-option (click)=\"applylastMonth()\">El mes pasado</mat-option>\n    </mat-select>\n</mat-form-field>\n",
                    providers: [DatePipe],
                    styles: ["mat-form-field{font-size:15px}"]
                },] },
    ];
    /** @nocollapse */
    RangeDatepickerComponent.ctorParameters = function () { return [
        { type: DatePipe }
    ]; };
    RangeDatepickerComponent.propDecorators = {
        startDate: [{ type: Input }],
        endDate: [{ type: Input }],
        startDateChange: [{ type: Output }],
        endDateChange: [{ type: Output }],
        updateDate: [{ type: Output }]
    };
    return RangeDatepickerComponent;
}());
export { RangeDatepickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9yYW5nZS1kYXRlcGlja2VyL3JhbmdlLWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixJQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFOUI7SUFnREksa0NBQTZCLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFKOUIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzNDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN6QyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVKLENBQUM7SUFFNUMsMkNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7SUFDbEMsQ0FBQztJQUVNLDhDQUFXLEdBQWxCLFVBQW1CLEtBQW9DO1FBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLEtBQXNDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVNLCtDQUFZLEdBQW5CLFVBQW9CLEtBQW9DO1FBQ3BELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLEtB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RCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FDN0MsQ0FBQztJQUNOLENBQUM7SUFFTyw0REFBeUIsR0FBakM7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztJQUN6RSxDQUFDO0lBRU8sdURBQW9CLEdBQTVCLFVBQTZCLElBQVUsRUFBRSxJQUFtQjtRQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Z0JBM0tKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsczRDQTZCYjtvQkFDRyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ3JCLE1BQU0sRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2lCQUM3Qzs7OztnQkF2Q1EsUUFBUTs7OzRCQThDWixLQUFLOzBCQUNMLEtBQUs7a0NBRUwsTUFBTTtnQ0FDTixNQUFNOzZCQUNOLE1BQU07O0lBOEhYLCtCQUFDO0NBQUEsQUE1S0QsSUE0S0M7U0F6SVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWUsIFNhdERhdGVwaWNrZXJJbnB1dEV2ZW50IH0gZnJvbSAnc2F0dXJuLWRhdGVwaWNrZXInO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5jb25zdCBzdGFydF90aW1lID0gWzAsIDAsIDBdO1xuY29uc3QgZW5kX3RpbWUgPSBbMjMsIDU5LCA1OV07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXJhbmdlLWRhdGVwaWNrZXInLFxuICAgIHRlbXBsYXRlOiBgPG1hdC1mb3JtLWZpZWxkIFttYXRUb29sdGlwXT1cImxhYmVsXCI+XG4gICAgPG1hdC1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVsXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uIChjbGljayk9XCJhcHBseUN1c3RvbVJhbmdlKCRldmVudCwgcmVzdWx0UGlja2VyKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICAgICAgICAgIDxzYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0UHJlZml4IFtmb3JdPVwicmVzdWx0UGlja2VyXCI+PC9zYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlJhbmdvIHBlcnNvbmFsaXphZG9cIlxuICAgICAgICAgICAgICAgICNyZXN1bHRQaWNrZXJNb2RlbD1cIm5nTW9kZWxcIlxuICAgICAgICAgICAgICAgIFtzYXREYXRlcGlja2VyXT1cInJlc3VsdFBpY2tlclwiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJkYXRlXCJcbiAgICAgICAgICAgICAgICAoZGF0ZUlucHV0KT1cIm9uRGF0ZUlucHV0KCRldmVudClcIlxuICAgICAgICAgICAgICAgIChkYXRlQ2hhbmdlKT1cIm9uRGF0ZUNoYW5nZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8c2F0LWRhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICNyZXN1bHRQaWNrZXIgW3JhbmdlTW9kZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICA8L3NhdC1kYXRlcGlja2VyPlxuXG4gICAgICAgICAgICA8ZGl2IG1hdFN1ZmZpeCBmeEZsZXg9XCIxMFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFRvb2x0aXA9XCJMaW1waWFyIGZpbHRyb1wiIChjbGljayk9XCJjbGVhclJhbmdlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmNsZWFyPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21hdC1vcHRpb24+XG5cbiAgICAgICAgPG1hdC1vcHRpb24gKGNsaWNrKT1cImFwcGx5VG9kYXkoKVwiPkhveTwvbWF0LW9wdGlvbj5cbiAgICAgICAgPG1hdC1vcHRpb24gKGNsaWNrKT1cImFwcGx5TGFzdFdlZWsoKVwiPsOabHRpbWEgc2VtYW5hPC9tYXQtb3B0aW9uPlxuICAgICAgICA8bWF0LW9wdGlvbiAoY2xpY2spPVwiYXBwbHlDdXJyZW50TW9udGgoKVwiPkVzdGUgbWVzPC9tYXQtb3B0aW9uPlxuICAgICAgICA8bWF0LW9wdGlvbiAoY2xpY2spPVwiYXBwbHlsYXN0TW9udGgoKVwiPkVsIG1lcyBwYXNhZG88L21hdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0PlxuPC9tYXQtZm9ybS1maWVsZD5cbmAsXG4gICAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxuICAgIHN0eWxlczogW2BtYXQtZm9ybS1maWVsZHtmb250LXNpemU6MTVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBSYW5nZURhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBkYXRlOiBTYXREYXRlcGlja2VyUmFuZ2VWYWx1ZTxEYXRlPjtcbiAgICBwdWJsaWMgbGFzdERhdGVJbnB1dDogU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT4gfCBudWxsO1xuICAgIHB1YmxpYyBsYXN0RGF0ZUNoYW5nZTogU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT4gfCBudWxsO1xuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHVibGljIHN0YXJ0RGF0ZTogRGF0ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZW5kRGF0ZTogRGF0ZTtcblxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc3RhcnREYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZW5kRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHVwZGF0ZURhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGF0ZVBpcGU6IERhdGVQaXBlKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxhYmVsID0gJ1JhbmdvIGRlIGZlY2hhJztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlSW5wdXQoZXZlbnQ6IFNhdERhdGVwaWNrZXJJbnB1dEV2ZW50PERhdGU+KTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFzdERhdGVJbnB1dCA9IGV2ZW50LnZhbHVlIGFzIFNhdERhdGVwaWNrZXJSYW5nZVZhbHVlPERhdGU+O1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGVDaGFuZ2UodGhpcy5sYXN0RGF0ZUlucHV0LmJlZ2luLCB0aGlzLmxhc3REYXRlSW5wdXQuZW5kKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25EYXRlQ2hhbmdlKGV2ZW50OiBTYXREYXRlcGlja2VySW5wdXRFdmVudDxEYXRlPik6IHZvaWQge1xuICAgICAgICB0aGlzLmxhc3REYXRlQ2hhbmdlID0gZXZlbnQudmFsdWUgYXMgU2F0RGF0ZXBpY2tlclJhbmdlVmFsdWU8RGF0ZT47XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZUNoYW5nZSh0aGlzLmxhc3REYXRlQ2hhbmdlLmJlZ2luLCB0aGlzLmxhc3REYXRlQ2hhbmdlLmVuZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFwcGx5Q3VzdG9tUmFuZ2UoZXZlbnQsIHBpY2tlcik6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcGlja2VyLm9wZW4oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwbHlMYXN0V2VlaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZS5zZXREYXRlKHRoaXMuZW5kRGF0ZS5nZXREYXRlKCkgLSA2KTtcbiAgICAgICAgdGhpcy5kYXRlID0geyBiZWdpbjogdGhpcy5zdGFydERhdGUsIGVuZDogdGhpcy5lbmREYXRlIH07XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZUNoYW5nZSh0aGlzLnN0YXJ0RGF0ZSwgdGhpcy5lbmREYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwbHlUb2RheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSB0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBseUN1cnJlbnRNb250aCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCAxKTtcbiAgICAgICAgdGhpcy5lbmREYXRlID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSArIDEsIDApO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclJhbmdlKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmRhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGVDaGFuZ2UobnVsbCwgbnVsbCk7XG4gICAgICAgIHRoaXMubGFiZWwgPSAnUmFuZ28gZGUgZmVjaGEnO1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBseWxhc3RNb250aCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpIC0gMSwgMSk7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCksIDApO1xuICAgICAgICB0aGlzLmRhdGUgPSB7IGJlZ2luOiB0aGlzLnN0YXJ0RGF0ZSwgZW5kOiB0aGlzLmVuZERhdGUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlQ2hhbmdlKHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRGF0ZUNoYW5nZShzdGFydF9kYXRlOiBEYXRlLCBlbmRfZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHN0YXJ0X2RhdGU7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IGVuZF9kYXRlO1xuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy50b2dnbGVQcmV2aWV3VGV4dChzdGFydF9kYXRlLCBlbmRfZGF0ZSk7XG4gICAgICAgIHRoaXMuc3RhcnREYXRlQ2hhbmdlLmVtaXQodGhpcy5mb3JtYXREYXRlQW5kQWRkVGltZShzdGFydF9kYXRlLCBzdGFydF90aW1lKSk7XG4gICAgICAgIHRoaXMuZW5kRGF0ZUNoYW5nZS5lbWl0KHRoaXMuZm9ybWF0RGF0ZUFuZEFkZFRpbWUoZW5kX2RhdGUsIGVuZF90aW1lKSk7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2dnbGVQcmV2aWV3VGV4dChzdGFydF9kYXRlOiBEYXRlLCBlbmRfZGF0ZT86IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc3RhcnRfZGF0ZSAmJiBlbmRfZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUHJldmlld1RleHQoc3RhcnRfZGF0ZSwgZW5kX2RhdGUpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRfZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5cyhzdGFydF9kYXRlKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZF9kYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXlzKGVuZF9kYXRlKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXlzKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAoZGF0ZS5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuICdob3knO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsICdkZCBNTU0geXl5eScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUHJldmlld1RleHQoc3RhcnRfZGF0ZTogRGF0ZSwgZW5kX2RhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc3RhcnRfZGF0ZS5nZXRGdWxsWWVhcigpICE9PSBlbmRfZGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHN0YXJ0X2RhdGUsICdkZCBNTU0geXl5eSAtICcpICtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShlbmRfZGF0ZSwgJ2RkIE1NTSB5eXl5JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnRfZGF0ZS5nZXRNb250aCgpID09PSBlbmRfZGF0ZS5nZXRNb250aCgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb21wYXJlRGF5c09mVGhlU2FtZU1vbnRoKCkpIHJldHVybiB0aGlzLmdldERheXMoc3RhcnRfZGF0ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oc3RhcnRfZGF0ZSwgJ2RkIC0gJykgK1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGVuZF9kYXRlLCAnZGQnKSArXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZW5kX2RhdGUsICcgTU1NIHl5eXknKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShzdGFydF9kYXRlLCAnZGQgTU1NIC0gJykgK1xuICAgICAgICAgICAgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZW5kX2RhdGUsICdkZCBNTU0nKSArXG4gICAgICAgICAgICB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShlbmRfZGF0ZSwgJyB5eXl5JylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXBhcmVEYXlzT2ZUaGVTYW1lTW9udGgoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZS5nZXREYXRlKCkgPT09IHRoaXMuZW5kRGF0ZS5nZXREYXRlKCkpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0RGF0ZUFuZEFkZFRpbWUoZGF0ZTogRGF0ZSwgdGltZTogQXJyYXk8bnVtYmVyPik6IERhdGUge1xuICAgICAgICBkYXRlLnNldEhvdXJzKHRpbWVbMF0sIHRpbWVbMV0sIHRpbWVbMl0pO1xuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbn1cbiJdfQ==