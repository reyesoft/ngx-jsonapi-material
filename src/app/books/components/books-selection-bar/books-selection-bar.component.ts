import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SelectionBarService, Destroyer } from 'ngx-jsonapi-material';
import { BooksService } from '../../books.service';

@Component({
    selector: 'demo-books-selection-bar',
    templateUrl: './books-selection-bar.component.html'
})
export class BooksSelectionBarComponent implements OnInit, OnDestroy {
    @Input() public selection: SelectionModel<any>;
    @Output() public reload: EventEmitter<any> = new EventEmitter<any>();
    @Output() public clearSelection: EventEmitter<any> = new EventEmitter<any>();

    public button_showed = false;

    private query_params: Params;
    private destroyer = new Destroyer();

    public constructor(
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected booksService: BooksService,
        protected matDialog: MatDialog,
        protected selectionBarService: SelectionBarService
    ) {
        activatedRoute.queryParams.subscribe(query_params => (this.query_params = query_params));
    }

    public ngOnDestroy() {
        this.destroyer.destroy();
    }

    public ngOnInit(): void {
        this.selectionBarService.selected$.pipe(this.destroyer.pipe()).subscribe(() => {
            this.button_showed = this.selection.selected.length > 1;
        });
    }

    public delete(): void {
        for (let book of this.selection.selected) {
            this.booksService.delete(book.id).subscribe(() => {
                book.attributes = {};
                this.reload.emit();
                this.clearSelection.emit();
                this.selectionBarService.destroy();
            });
        }
    }
}
