import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { PinOptionButtonComponent } from './pin-option-button.component';
import { NgxJsonapiMaterialModule } from '../ngx-jsonapi-material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        NgxJsonapiMaterialModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ],
    declarations: [PinOptionButtonComponent],
    providers: [],
    exports: [PinOptionButtonComponent]
})
export class JamPinOptionButtonModule {}
