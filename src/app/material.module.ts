import { NgModule } from '@angular/core';
import {
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [],
    imports: [
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatToolbarModule,
        MatTooltipModule,
        MatMenuModule,
        MatCheckboxModule,
        MatIconModule,
        FlexLayoutModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule
    ],
    exports: [
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatToolbarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        FlexLayoutModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule
    ],
    providers: []
})
export class MaterialModule {}
