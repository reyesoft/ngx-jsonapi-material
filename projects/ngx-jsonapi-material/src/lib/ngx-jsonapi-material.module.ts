import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxJsonapiMaterialComponent } from './ngx-jsonapi-material.component';
import { MaterialModule } from './material.module';

@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    declarations: [NgxJsonapiMaterialComponent],
    exports: [NgxJsonapiMaterialComponent]
})
export class NgxJsonapiMaterialModule {}
