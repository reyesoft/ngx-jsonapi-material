import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FabSpeedDialComponent } from './fab-speed-dial.component';

@NgModule({
    imports: [CommonModule, RouterModule, EcoFabSpeedDialModule, MatIconModule, MatTooltipModule, MatButtonModule],
    declarations: [FabSpeedDialComponent],
    exports: [FabSpeedDialComponent]
})
export class FabSpeedDialModule {}
