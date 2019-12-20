import { MatBottomSheetRef } from '@angular/material';
export declare class BottomSheetComponent {
    data: any;
    private matBottomSheetRef;
    constructor(data: any, matBottomSheetRef: MatBottomSheetRef<BottomSheetComponent>);
    close(): void;
    selected(option: string): void;
}
