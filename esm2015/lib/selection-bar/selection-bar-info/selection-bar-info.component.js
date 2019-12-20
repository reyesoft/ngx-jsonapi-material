import { Component } from '@angular/core';
import { Destroyer } from '../../destroyer';
import { SelectionBarService } from '../selection-bar.service';
export class SelectionBarInfoComponent {
    constructor(selectionBarService) {
        this.selectionBarService = selectionBarService;
        this.destroyer = new Destroyer();
        this.selectionBarService.selected$
            .pipe(this.destroyer.pipe())
            .subscribe(selection => {
            this.selection = selection;
            this.label = selection.selected.length + (selection.selected.length >= 1 ? ' seleccionados' : ' seleccionado');
            if (selection.selected.length <= 0)
                this.selectionBarService.destroy();
        });
    }
    ngOnDestroy() {
        this.destroyer.destroy();
    }
    close() {
        this.selection.clear();
        this.selectionBarService.destroy();
    }
}
SelectionBarInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-selection-bar-info',
                template: `<div fxLayout="row" fxLayoutAlign="end center">
    <button mat-icon-button matTooltip="Borrar selección" (click)="close()">
        <mat-icon class="material-icons">arrow_back</mat-icon>
    </button>
    <span>{{ label }}</span>
</div>
`
            },] },
];
/** @nocollapse */
SelectionBarInfoComponent.ctorParameters = () => [
    { type: SelectionBarService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWJhci1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdGlvbi1iYXIvc2VsZWN0aW9uLWJhci1pbmZvL3NlbGVjdGlvbi1iYXItaW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBMEMsTUFBTSxlQUFlLENBQUM7QUFFbEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBWS9ELE1BQU0sT0FBTyx5QkFBeUI7SUFLbEMsWUFDYyxtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUg5QyxjQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUtoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUzthQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMzQixTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9HLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7WUFsQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7O0NBTWI7YUFDQTs7OztZQVhRLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IERlc3Ryb3llciB9IGZyb20gJy4uLy4uL2Rlc3Ryb3llcic7XG5pbXBvcnQgeyBTZWxlY3Rpb25CYXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VsZWN0aW9uLWJhci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqYW0tc2VsZWN0aW9uLWJhci1pbmZvJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFRvb2x0aXA9XCJCb3JyYXIgc2VsZWNjacOzblwiIChjbGljayk9XCJjbG9zZSgpXCI+XG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPHNwYW4+e3sgbGFiZWwgfX08L3NwYW4+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uQmFySW5mb0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uTW9kZWw8YW55PjtcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgICBwcml2YXRlIGRlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHNlbGVjdGlvbkJhclNlcnZpY2U6IFNlbGVjdGlvbkJhclNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25CYXJTZXJ2aWNlLnNlbGVjdGVkJFxuICAgICAgICAgICAgLnBpcGUodGhpcy5kZXN0cm95ZXIucGlwZSgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShzZWxlY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwgPSBzZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoICsgKHNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGggPj0gMSA/ICcgc2VsZWNjaW9uYWRvcycgOiAnIHNlbGVjY2lvbmFkbycpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoIDw9IDApIHRoaXMuc2VsZWN0aW9uQmFyU2VydmljZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQmFyU2VydmljZS5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19