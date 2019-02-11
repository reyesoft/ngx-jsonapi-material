import { NgModule } from '@angular/core';
import { MatTableModule, MatButtonModule, MatPaginatorModule, MatCardModule, MatIconModule,
    MatMenuModule, MatTooltipModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatTabsModule,
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
        MatTabsModule,
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
        MatTabsModule,
        MatButtonModule
    ],
    providers: []
})
export class MaterialModule {}
