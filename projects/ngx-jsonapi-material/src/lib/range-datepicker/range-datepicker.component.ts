import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SatDatepickerRangeValue, SatDatepickerInputEvent } from 'saturn-datepicker';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jam-range-datepicker',
    templateUrl: './range-datepicker.component.html',
    styleUrls: ['./range-datepicker.component.scss']
})
export class RangeDatepickerComponent implements OnInit {
    public date: SatDatepickerRangeValue<Date>;
    public lastDateInput: SatDatepickerRangeValue<Date> | null;
    public lastDateChange: SatDatepickerRangeValue<Date> | null;
    public label: string;

    @Input() public startDate: Date;
    @Input() public endDate: Date;

    @Output() public startDateChange = new EventEmitter<Date>();
    @Output() public endDateChange = new EventEmitter<Date>();
    @Output() public updateDate = new EventEmitter<any>();

    public constructor(protected datePipe: DatePipe) {}

    public ngOnInit() {
        this.label = 'Rango de fecha';
    }

    public onDateInput(event: SatDatepickerInputEvent<Date>): void {
        this.lastDateInput = event.value as SatDatepickerRangeValue<Date>;
        this.updateDateChange(this.lastDateInput.begin, this.lastDateInput.end);
    }

    public onDateChange(event: SatDatepickerInputEvent<Date>): void {
        this.lastDateChange = event.value as SatDatepickerRangeValue<Date>;
        this.updateDateChange(this.lastDateChange.begin, this.lastDateChange.end);
    }

    public applyCustomRange(event, picker): void {
        event.stopPropagation();
        picker.open();
    }

    public applyLastWeek(): void {
        this.endDate = new Date();
        this.startDate = new Date();
        this.startDate.setDate(this.endDate.getDate() - 6);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    }

    public applyToday(): void {
        this.startDate = this.endDate = new Date();
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    }

    public applyCurrentMonth(): void {
        let today = new Date();
        this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    }

    public clearRange(event): void {
        event.stopPropagation();
        this.date = null;
        this.updateDateChange(null, null);
        this.label = 'Rango de fecha';
    }

    public applylastMonth(): void {
        let today = new Date();
        this.startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        this.endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        this.date = { begin: this.startDate, end: this.endDate };
        this.updateDateChange(this.startDate, this.endDate);
    }

    private updateDateChange(start_date: Date, end_date: Date): void {
        this.startDate = start_date;
        this.endDate = end_date;
        this.label = this.togglePreviewText(start_date, end_date);
        this.startDateChange.emit(start_date);
        this.endDateChange.emit(end_date);
        this.updateDate.emit();
    }

    private togglePreviewText(start_date: Date, end_date?: Date): string {
        if (start_date && end_date) {
            return this.createPreviewText(start_date, end_date).toUpperCase();
        } else if (start_date) {
            return this.getDays(start_date).toUpperCase();
        } else if (end_date) {
            return this.getDays(end_date).toUpperCase();
        }
    }

    private getDays(date: Date): string {
        let today = new Date();
        if (date.getDate() === today.getDate()) {
            return 'hoy';
        } else {
            return this.datePipe.transform(date, 'dd MMM yyyy');
        }
    }

    private createPreviewText(start_date: Date, end_date: Date): string {
        if (start_date.getFullYear() !== end_date.getFullYear()) {
            return (
                this.datePipe.transform(start_date, 'dd MMM yyyy - ') +
                this.datePipe.transform(end_date, 'dd MMM yyyy')
            );
        } else if (start_date.getMonth() === end_date.getMonth()) {
            if (this.compareDaysOfTheSameMonth()) return this.getDays(start_date);

            return (
                this.datePipe.transform(start_date, 'dd - ') +
                this.datePipe.transform(end_date, 'dd') +
                this.datePipe.transform(end_date, ' MMM yyyy')
            );
        } else {
            return (
                this.datePipe.transform(start_date, 'dd MMM - ') +
                this.datePipe.transform(end_date, 'dd MMM') +
                this.datePipe.transform(end_date, ' yyyy')
            );
        }
    }

    private compareDaysOfTheSameMonth(): boolean {
        if (this.startDate.getDate() === this.endDate.getDate()) return true;
    }
}
