import { Component } from '@angular/core';
import { Destroyer } from '../../destroyer';
import { SelectionBarService } from '../selection-bar.service';
var SelectionBarInfoComponent = /** @class */ (function () {
    function SelectionBarInfoComponent(selectionBarService) {
        var _this = this;
        this.selectionBarService = selectionBarService;
        this.destroyer = new Destroyer();
        this.selectionBarService.selected$
            .pipe(this.destroyer.pipe())
            .subscribe(function (selection) {
            _this.selection = selection;
            _this.label = selection.selected.length + (selection.selected.length >= 1 ? ' seleccionados' : ' seleccionado');
            if (selection.selected.length <= 0)
                _this.selectionBarService.destroy();
        });
    }
    SelectionBarInfoComponent.prototype.ngOnDestroy = function () {
        this.destroyer.destroy();
    };
    SelectionBarInfoComponent.prototype.close = function () {
        this.selection.clear();
        this.selectionBarService.destroy();
    };
    SelectionBarInfoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-selection-bar-info',
                    template: "<div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n    <button mat-icon-button matTooltip=\"Borrar selecci\u00F3n\" (click)=\"close()\">\n        <mat-icon class=\"material-icons\">arrow_back</mat-icon>\n    </button>\n    <span>{{ label }}</span>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    SelectionBarInfoComponent.ctorParameters = function () { return [
        { type: SelectionBarService }
    ]; };
    return SelectionBarInfoComponent;
}());
export { SelectionBarInfoComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWJhci1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdGlvbi1iYXIvc2VsZWN0aW9uLWJhci1pbmZvL3NlbGVjdGlvbi1iYXItaW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBMEMsTUFBTSxlQUFlLENBQUM7QUFFbEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9EO0lBZUksbUNBQ2MsbUJBQXdDO1FBRHRELGlCQVVDO1FBVGEsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUg5QyxjQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUtoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUzthQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMzQixTQUFTLENBQUMsVUFBQSxTQUFTO1lBQ2hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvRyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JBQUUsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLCtDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0seUNBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7O2dCQWxDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLHFRQU1iO2lCQUNBOzs7O2dCQVhRLG1CQUFtQjs7SUFxQzVCLGdDQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0F6QlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgRGVzdHJveWVyIH0gZnJvbSAnLi4vLi4vZGVzdHJveWVyJztcbmltcG9ydCB7IFNlbGVjdGlvbkJhclNlcnZpY2UgfSBmcm9tICcuLi9zZWxlY3Rpb24tYmFyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1zZWxlY3Rpb24tYmFyLWluZm8nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0VG9vbHRpcD1cIkJvcnJhciBzZWxlY2Npw7NuXCIgKGNsaWNrKT1cImNsb3NlKClcIj5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8c3Bhbj57eyBsYWJlbCB9fTwvc3Bhbj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25CYXJJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwdWJsaWMgc2VsZWN0aW9uOiBTZWxlY3Rpb25Nb2RlbDxhbnk+O1xuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xuICAgIHByaXZhdGUgZGVzdHJveWVyID0gbmV3IERlc3Ryb3llcigpO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgc2VsZWN0aW9uQmFyU2VydmljZTogU2VsZWN0aW9uQmFyU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkJhclNlcnZpY2Uuc2VsZWN0ZWQkXG4gICAgICAgICAgICAucGlwZSh0aGlzLmRlc3Ryb3llci5waXBlKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbCA9IHNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGggKyAoc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCA+PSAxID8gJyBzZWxlY2Npb25hZG9zJyA6ICcgc2VsZWNjaW9uYWRvJyk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGggPD0gMCkgdGhpcy5zZWxlY3Rpb25CYXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25CYXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=