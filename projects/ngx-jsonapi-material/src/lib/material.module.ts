import { NgModule } from '@angular/core';
import { MatTableModule, MatButtonModule, MatPaginatorModule, MatCardModule, MatIconModule,
    MatMenuModule, MatTooltipModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatTabsModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatOptionModule, MatSelectModule, MatExpansionModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [],
    imports: [
        MatExpansionModule,
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
        MatExpansionModule,
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
