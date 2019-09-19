import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionInfoComponent } from './collection-info.component';
import { CollectionPaginatorComponent } from './collection-paginator.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
@NgModule({
    imports: [CommonModule, RouterModule, MaterialModule],
    exports: [CollectionInfoComponent, CollectionPaginatorComponent, MaterialModule],
    declarations: [CollectionInfoComponent, CollectionPaginatorComponent]
})
export class SharedModule {}
