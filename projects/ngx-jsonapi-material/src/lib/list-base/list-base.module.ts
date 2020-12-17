import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBaseCommonComponent } from './list-base-common/list-base-common.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableLoaderComponent } from './base/table-loader/table-loader.component';
import { TableSpinnerComponent } from './base/rs-table-spinner/table-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NothingHereComponent } from './base/nothing-here/nothing-here.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { AppCapitalizePipe } from './capitalize-pipe/capitalize.pipe';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicPipe } from './dynamic-pipe/dynamic.pipe';
import { AppDatePipe, AppDateTimePipe } from './date-pipe/app-date.pipe';
import { AppCurrencyPipe } from './currency-pipe/app-currency.pipe';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { SelectionBarService } from '../selection-bar/selection-bar.service';
import { DomService } from '../selection-bar/dom.service';
import { ResourceSelectionBarService } from '../selection-bar/resource-selection-bar.service';
import { JamSelectionBarModule } from '../selection-bar/selection-bar.module';
import { JamMenuModule } from '../menu/menu.module';
import { UpdateFiltersService } from './base/update-filters/update-filters.component';
import { JamRefreshService } from '../refresh/refresh.component';
import { JamRefreshModule } from '../refresh/refresh.module';

@NgModule({
    declarations: [
        ListBaseCommonComponent,
        TableLoaderComponent,
        TableSpinnerComponent,
        NothingHereComponent,
        DynamicPipe,
        AppCapitalizePipe,
        AppDatePipe,
        AppDateTimePipe,
        AppCurrencyPipe,
    ],
    exports: [
        ListBaseCommonComponent,
        AppCapitalizePipe,
        AppDatePipe,
        AppDateTimePipe,
        AppCurrencyPipe
    ],
    imports: [
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        JamRefreshModule,
        FormsModule,
        FlexModule,
        MatTableModule,
        JamSelectionBarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatSortModule,
        JamMenuModule,
        MatPaginatorModule,
        MatDividerModule,
        TranslateModule,
        CommonModule
    ],
    providers: [
        ResourceSelectionBarService,
        SelectionBarService,
        DomService,
        UpdateFiltersService,
        JamRefreshService,
        AppDatePipe,
        AppDateTimePipe,
        AppCurrencyPipe,
        AppCapitalizePipe,
        DynamicPipe
    ]
})
export class ListBaseModule {}
