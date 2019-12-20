import { Component, EventEmitter, Input, Output } from '@angular/core';
export class DropdownMenuComponent {
    constructor() {
        this.selected = new EventEmitter();
    }
}
DropdownMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-dropdown-menu',
                styles: [`/deep/ h3{font-size:10pt;margin:16px;font-weight:500}jam-dropdown-menu{display:block}.jam-bottom-sheet{display:none}.disabled{opacity:.5}@media only screen and (max-width:599px){jam-dropdown-menu{display:none}.jam-bottom-sheet{display:block}}`],
                template: `<button
    mat-icon-button
    class="mat-icon-button mat-button"
    matTooltip="Más"
    fxLayout="row"
    fxLayoutAlign="center center"
    [matMenuTriggerFor]="menuRef"
    >
    <img
        *ngIf="main_image"
        [src]="main_image?.url"
        [ngStyle]="main_image?.styles"
        />
    <mat-icon *ngIf="!main_image">more_vert</mat-icon>
</button>

<mat-menu #menuRef="matMenu">
    <ng-container *ngFor="let section of sections; let position = index">
        <mat-divider *ngIf="section.hasShownElements() && !section.hidden && position > 0"></mat-divider>

        <h3 class="mat-hint" *ngIf="section.hasShownElements() && !section.hidden && section.id">
            <span [innerHtml]="section.id"></span>
        </h3>

        <ng-container *ngFor="let button of section.data">
            <button
                mat-menu-item
                *ngIf="!button.attributes.hidden"
                [disabled]="button.attributes.disabled"
                [ngClass]="button.attributes.class"
                (click)="selected.emit(button.id)"
                >
                <mat-icon
                    *ngIf="button.attributes.icon"
                    [innerHtml]="button.attributes.icon"
                    >
                </mat-icon>
                <mat-icon
                    *ngIf="button.attributes.svg_icon"
                    [svgIcon]="button.attributes.svg_icon"
                    >
                </mat-icon>
                <span [innerHtml]="button.attributes.label"></span>
            </button>
        </ng-container>
    </ng-container>
</mat-menu>
`
            },] },
];
DropdownMenuComponent.propDecorators = {
    sections: [{ type: Input }],
    main_image: [{ type: Input }],
    selected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9tZW51L2Ryb3Bkb3duLW1lbnUvZHJvcGRvd24tbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXVEdkUsTUFBTSxPQUFPLHFCQUFxQjtJQXBEbEM7UUF1RHFCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBQzNELENBQUM7OztZQXhEQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsTUFBTSxFQUFFLENBQUMsb1BBQW9QLENBQUM7Z0JBQzlQLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0ErQ2I7YUFDQTs7O3VCQUVJLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuLi9tZW51LWVsZW1lbnRzL3NlY3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS1kcm9wZG93bi1tZW51JyxcbiAgICBzdHlsZXM6IFtgL2RlZXAvIGgze2ZvbnQtc2l6ZToxMHB0O21hcmdpbjoxNnB4O2ZvbnQtd2VpZ2h0OjUwMH1qYW0tZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5qYW0tYm90dG9tLXNoZWV0e2Rpc3BsYXk6bm9uZX0uZGlzYWJsZWR7b3BhY2l0eTouNX1AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpe2phbS1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZX0uamFtLWJvdHRvbS1zaGVldHtkaXNwbGF5OmJsb2NrfX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b25cbiAgICBtYXQtaWNvbi1idXR0b25cbiAgICBjbGFzcz1cIm1hdC1pY29uLWJ1dHRvbiBtYXQtYnV0dG9uXCJcbiAgICBtYXRUb29sdGlwPVwiTcOhc1wiXG4gICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCJcbiAgICBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVJlZlwiXG4gICAgPlxuICAgIDxpbWdcbiAgICAgICAgKm5nSWY9XCJtYWluX2ltYWdlXCJcbiAgICAgICAgW3NyY109XCJtYWluX2ltYWdlPy51cmxcIlxuICAgICAgICBbbmdTdHlsZV09XCJtYWluX2ltYWdlPy5zdHlsZXNcIlxuICAgICAgICAvPlxuICAgIDxtYXQtaWNvbiAqbmdJZj1cIiFtYWluX2ltYWdlXCI+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbjwvYnV0dG9uPlxuXG48bWF0LW1lbnUgI21lbnVSZWY9XCJtYXRNZW51XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc2VjdGlvbiBvZiBzZWN0aW9uczsgbGV0IHBvc2l0aW9uID0gaW5kZXhcIj5cbiAgICAgICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwic2VjdGlvbi5oYXNTaG93bkVsZW1lbnRzKCkgJiYgIXNlY3Rpb24uaGlkZGVuICYmIHBvc2l0aW9uID4gMFwiPjwvbWF0LWRpdmlkZXI+XG5cbiAgICAgICAgPGgzIGNsYXNzPVwibWF0LWhpbnRcIiAqbmdJZj1cInNlY3Rpb24uaGFzU2hvd25FbGVtZW50cygpICYmICFzZWN0aW9uLmhpZGRlbiAmJiBzZWN0aW9uLmlkXCI+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInNlY3Rpb24uaWRcIj48L3NwYW4+XG4gICAgICAgIDwvaDM+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIHNlY3Rpb24uZGF0YVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG1hdC1tZW51LWl0ZW1cbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFidXR0b24uYXR0cmlidXRlcy5oaWRkZW5cIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJidXR0b24uYXR0cmlidXRlcy5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiYnV0dG9uLmF0dHJpYnV0ZXMuY2xhc3NcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RlZC5lbWl0KGJ1dHRvbi5pZClcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJidXR0b24uYXR0cmlidXRlcy5pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgW2lubmVySHRtbF09XCJidXR0b24uYXR0cmlidXRlcy5pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiYnV0dG9uLmF0dHJpYnV0ZXMuc3ZnX2ljb25cIlxuICAgICAgICAgICAgICAgICAgICBbc3ZnSWNvbl09XCJidXR0b24uYXR0cmlidXRlcy5zdmdfaWNvblwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwiYnV0dG9uLmF0dHJpYnV0ZXMubGFiZWxcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L21hdC1tZW51PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bk1lbnVDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzZWN0aW9uczogQXJyYXk8U2VjdGlvbj47XG4gICAgQElucHV0KCkgcHVibGljIG1haW5faW1hZ2U6IHsgdXJsOiBzdHJpbmc7IHN0eWxlczoge1trZXk6IHN0cmluZ106IHN0cmluZ319O1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbn1cbiJdfQ==