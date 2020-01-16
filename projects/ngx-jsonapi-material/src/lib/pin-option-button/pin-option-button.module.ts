import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
