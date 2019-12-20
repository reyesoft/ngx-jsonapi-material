/***
 * Copyright (C) 1997-2017 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Destroyer } from '../destroyer';
export class SearchInputComponent {
    constructor() {
        this.opened = false;
        this.textChange = new EventEmitter();
        this.searchCtrl = new FormControl();
        this.showSearch = false;
        this.destroyer = new Destroyer();
    }
    ngOnInit() {
        this.showSearch = this.opened || this.showSearch;
        this.searchCtrl.valueChanges
            .pipe(this.destroyer.pipe(), map(x => x), debounceTime(400)).subscribe(newValue => this.textChange.emit(newValue));
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    showInput() {
        if (this.opened) {
            this.showSearch = this.opened;
        }
        else {
            this.showSearch = !this.showSearch;
            setTimeout(() => { if (this.showSearch)
                document.getElementById('search-input').focus(); }, 0);
        }
    }
    switch() {
        if (this.opened) {
            this.showSearch = this.opened;
        }
        else {
            this.showSearch = false;
        }
        if (this.searchCtrl.value !== '') {
            this.searchCtrl.setValue('');
            this.textChange.emit(this.searchCtrl.value);
        }
    }
}
SearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-search-input',
                styles: [`div.opened{background-color:rgba(0,0,0,.12)}.jam-input{border:0;background:0 0;height:48px;padding:16px;outline:0!important}.mat-icon{margin:0!important}@media only screen and (max-width:600px){div.opened{position:absolute;top:0;left:0;right:0;z-index:333;background:#fff;height:48px;max-height:48px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}div.opened:active,div.opened:focus,div.opened:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}}`],
                template: `<div fxLayout="row" fxLayoutAlign="space-between center">
    <button mat-icon-button class="mat-button" matTooltip="Buscar"
        *ngIf="!showSearch"
        (click)="showInput()">
        <mat-icon class="mat-hint">search</mat-icon>
    </button>
    <div class="reset-input-default" fxFlex="100" [style.padding-left]="'16px'"
        *ngIf="showSearch"
        [ngClass]="showSearch ? 'opened' : ''"
        fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16">
        <mat-icon class="mat-hint">search</mat-icon>
        <input class="jam-input" fxFlex id="search-input" autocomplete="off"
            [formControl]="searchCtrl" placeholder="Buscar...">

        <button mat-icon-button class="mat-button" (click)="switch()">
            <mat-icon class="mat-hint">clear</mat-icon>
        </button>
    </div>
</div>
`
            },] },
];
SearchInputComponent.propDecorators = {
    text: [{ type: Input }],
    opened: [{ type: Input }],
    textChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC1pbnB1dC9zZWFyY2gtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQTBCekMsTUFBTSxPQUFPLG9CQUFvQjtJQXhCakM7UUEwQm9CLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDdkIsZUFBVSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhFLGVBQVUsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUU1QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBdUN4QyxDQUFDO0lBckNVLFFBQVE7UUFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVk7YUFDdkIsSUFBSSxDQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNYLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FDcEIsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sU0FBUztRQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNqQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbkMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVU7Z0JBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsRztJQUVMLENBQUM7SUFFTSxNQUFNO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUMzQjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0M7SUFDTCxDQUFDOzs7WUF2RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLE1BQU0sRUFBRSxDQUFDLHNpQkFBc2lCLENBQUM7Z0JBQ2hqQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtQmI7YUFDQTs7O21CQUVJLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTcgUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVzdHJveWVyIH0gZnJvbSAnLi4vZGVzdHJveWVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tc2VhcmNoLWlucHV0JyxcbiAgICBzdHlsZXM6IFtgZGl2Lm9wZW5lZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEyKX0uamFtLWlucHV0e2JvcmRlcjowO2JhY2tncm91bmQ6MCAwO2hlaWdodDo0OHB4O3BhZGRpbmc6MTZweDtvdXRsaW5lOjAhaW1wb3J0YW50fS5tYXQtaWNvbnttYXJnaW46MCFpbXBvcnRhbnR9QG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjYwMHB4KXtkaXYub3BlbmVke3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MzMzO2JhY2tncm91bmQ6I2ZmZjtoZWlnaHQ6NDhweDttYXgtaGVpZ2h0OjQ4cHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfWRpdi5vcGVuZWQ6YWN0aXZlLGRpdi5vcGVuZWQ6Zm9jdXMsZGl2Lm9wZW5lZDpob3Zlcntib3gtc2hhZG93OjAgMnB4IDRweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNHB4IDVweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1idXR0b25cIiBtYXRUb29sdGlwPVwiQnVzY2FyXCJcbiAgICAgICAgKm5nSWY9XCIhc2hvd1NlYXJjaFwiXG4gICAgICAgIChjbGljayk9XCJzaG93SW5wdXQoKVwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiPnNlYXJjaDwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cInJlc2V0LWlucHV0LWRlZmF1bHRcIiBmeEZsZXg9XCIxMDBcIiBbc3R5bGUucGFkZGluZy1sZWZ0XT1cIicxNnB4J1wiXG4gICAgICAgICpuZ0lmPVwic2hvd1NlYXJjaFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInNob3dTZWFyY2ggPyAnb3BlbmVkJyA6ICcnXCJcbiAgICAgICAgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCIxNlwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiPnNlYXJjaDwvbWF0LWljb24+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImphbS1pbnB1dFwiIGZ4RmxleCBpZD1cInNlYXJjaC1pbnB1dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwic2VhcmNoQ3RybFwiIHBsYWNlaG9sZGVyPVwiQnVzY2FyLi4uXCI+XG5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtYnV0dG9uXCIgKGNsaWNrKT1cInN3aXRjaCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaGludFwiPmNsZWFyPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcHVibGljIHRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIHB1YmxpYyB0ZXh0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyBzZWFyY2hDdHJsOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuXG4gICAgcHVibGljIHNob3dTZWFyY2ggPSBmYWxzZTtcblxuICAgIHByaXZhdGUgZGVzdHJveWVyID0gbmV3IERlc3Ryb3llcigpO1xuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNob3dTZWFyY2ggPSB0aGlzLm9wZW5lZCB8fCB0aGlzLnNob3dTZWFyY2g7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hDdHJsLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95ZXIucGlwZSgpLFxuICAgICAgICAgICAgICAgIG1hcCh4ID0+IHgpLFxuICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSg0MDApXG4gICAgICAgICAgICApLnN1YnNjcmliZShuZXdWYWx1ZSA9PiB0aGlzLnRleHRDaGFuZ2UuZW1pdChuZXdWYWx1ZSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93SW5wdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93U2VhcmNoID0gdGhpcy5vcGVuZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTZWFyY2ggPSAhdGhpcy5zaG93U2VhcmNoO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGlmICh0aGlzLnNob3dTZWFyY2gpIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtaW5wdXQnKS5mb2N1cygpOyB9LCAwKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIHN3aXRjaCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTZWFyY2ggPSB0aGlzLm9wZW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1NlYXJjaCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoQ3RybC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQ3RybC5zZXRWYWx1ZSgnJyk7XG4gICAgICAgICAgICB0aGlzLnRleHRDaGFuZ2UuZW1pdCh0aGlzLnNlYXJjaEN0cmwudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19