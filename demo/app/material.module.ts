import { NgModule } from '@angular/core';
import { MatTableModule, MatButtonModule, MatPaginatorModule, MatCardModule, MatIconModule,
    MatMenuModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [],
    imports: [
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
