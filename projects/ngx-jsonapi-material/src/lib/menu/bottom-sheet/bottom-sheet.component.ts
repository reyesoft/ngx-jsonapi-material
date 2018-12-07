import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'jam-bottom-sheet',
    styleUrls: ['../menu.component.scss'],
    templateUrl: './bottom-sheet.component.html'
})
export class BottomSheetComponent {
    public constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private matBottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
    ) { }

    public close(): void {
        this.matBottomSheetRef.dismiss();
    }

    public selected(option: string): void {
        this.matBottomSheetRef.dismiss(option);
    }
}
