import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';
import { AuthorsService, Author } from './../authors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from 'projects/ngx-jsonapi-material/src/lib/list-base/list-base-common/table-components/table-columns';
import { IPage } from 'projects/ngx-jsonapi-material/src/lib/list-base/list-base';
import { AppDatePipe } from 'projects/ngx-jsonapi-material/src/lib/list-base/date-pipe/app-date.pipe';
import { ResponsiveColumns } from 'projects/ngx-jsonapi-material/src/lib/list-base/list-base-common/table-components/responsive-columns';

@Component({
    selector: 'demo-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent implements AfterViewInit {
    @ViewChild('default_id', { static: true }) public default_id: TemplateRef<any>;
    public page: IPage = {
        pageIndex: 0,
        pageSize: 10
    };
    public responsiveColumns: ResponsiveColumns = new ResponsiveColumns();
    public stylesCell = {
        'font-weight': 'bold'
    };
    public tableColumns = [
        new Column('id', 'ID', 'ID')
            .setHeaderStyles(this.stylesCell)
            .hideOnMobile()
            .templateOnly(true),
        new Column('name', 'Name', 'Name').setHeaderStyles(this.stylesCell).hideOnMobile(),
        new Column('date_of_birth', 'Date of birth', 'Date of birth')
            .setHeaderStyles(this.stylesCell)
            .setPipe({ pipe: AppDatePipe })
            .hideOnMobile(),
        new Column('date_of_death', 'Date of death', 'Date of death')
            .setHeaderStyles(this.stylesCell)
            .setPipe({ pipe: AppDatePipe })
            .hideOnMobile()
    ];

    public constructor(public authorsService: AuthorsService) {
        this.responsiveColumns
            .setXs(['mobile'])
            .setSm(['name', 'date_of_birth', 'date_of_death'])
            .setMd(['id', 'name', 'date_of_birth', 'date_of_death'])
            .setLg(['id', 'name', 'date_of_birth', 'date_of_death'])
            .setXl(['id', 'name', 'date_of_birth', 'date_of_death']);
    }

    public ngAfterViewInit() {
        this.tableColumns.find((column): boolean => column.key === 'id').setTemplate(this.default_id);
    }
}
