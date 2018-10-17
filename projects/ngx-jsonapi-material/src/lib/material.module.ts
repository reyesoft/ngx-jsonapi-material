import { NgModule } from '@angular/core';
import { MatTableModule, MatButtonModule, MatPaginatorModule, MatCardModule, MatIconModule,
    MatMenuModule, MatTooltipModule, MatToolbarModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [],
    imports: [
        MatSelectModule,
        MatOptionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatToolbarModule,
        MatTooltipModule,
        MatMenuModule,
        MatIconModule,
        FlexLayoutModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule
    ],
    exports: [
        MatSelectModule,
        MatOptionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatToolbarModule,
        MatTooltipModule,
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
