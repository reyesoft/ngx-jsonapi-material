import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export class PictureManagerComponent {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.showDeleteOption = true;
        /**
         * Outputs
         * @param uploadChange: updates the image and returns the url for it.
         */
        this.uploadChange = new EventEmitter();
        this.response = new EventEmitter();
        this.drag_and_drop = false;
    }
    ngOnInit() {
        this.settingDefaultValues();
    }
    dragAndDropStyles(drag_and_drop) {
        this.drag_and_drop = drag_and_drop;
    }
    showPreview(image) {
        this.source = image;
        this.deleteUrl = this.deleteUrl || this.source;
        this.uploadChange.emit({ status_change: 'update', source: this.source });
    }
    delete() {
        let delete_url = this.creatDeleteUrl(this.source);
        this.httpClient.delete(delete_url, {
            headers: this.jamHeaders
        }).subscribe((response) => {
            this.uploadChange.emit({ status_change: 'delete', source: this.source });
        });
    }
    settingDefaultValues() {
        this.type = this.type || 'square';
        this.deleteUrl = this.deleteUrl || this.source;
        this.uploadUrl = this.uploadUrl || this.source;
    }
    creatDeleteUrl(source) {
        let img_url_parties = source.split('/');
        let img_name = img_url_parties.pop();
        return this.deleteUrl + img_name;
    }
}
PictureManagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-picture-manager',
                template: `<jam-upload [uploadUrl]="uploadUrl" (dragAndDropChange)="dragAndDropStyles($event)" (showPreview)="showPreview($event)" mat-icon-button fxLayout="row" fxLayoutAlign="center center"
    [jamHeaders]="jamHeaders"
    (response)="response.emit($event)"
    >
    <div *ngIf="drag_and_drop" [ngClass]="type + '-drag-and-drop-styles'"></div>
    <div *ngIf="!drag_and_drop" id="picture-manager" class="mouseover">
        <div [ngClass]="type" [style.background-image]="'url(' + source + ')'">
            <div class="mouseover-child">
                <div class="blur" [style.background-image]="'url(' + source + ')'"></div>
                <div class="overlay"></div>
                <div class="menu">
                    <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="8px">
                        <mat-icon matTooltip="Subir imagen">add_a_photo</mat-icon>
                        <mat-divider *ngIf="showDeleteOption"></mat-divider>
                        <jam-delete-confirmation *ngIf="showDeleteOption"
                            [styled]="{ color: 'white' }"
                            (delete)="delete()"
                        ></jam-delete-confirmation>
                    </div>
                </div>
            </div>
        </div>
    </div>
</jam-upload>
`,
                styles: [`jam-upload #picture-manager *,jam-upload #picture-manager *>mat-icon{width:auto;height:auto}.square{border-radius:2%;overflow:hidden}.round{border-radius:50%;overflow:hidden}.round-drag-and-drop-styles{background-color:rgba(0,0,0,.05);position:relative;width:180px;height:180px;top:0;left:0;z-index:333;background-image:url(/assets/images/drag_and_drop.png);border-radius:50%}.square-drag-and-drop-styles{background-color:rgba(0,0,0,.05);position:relative;width:180px;height:180px;top:0;left:0;z-index:333;background-image:url(/assets/images/drag_and_drop.png)}jam-upload #picture-manager *>mat-icon{color:#fff;font-size:4.5rem}jam-upload #picture-manager.mouseover:hover{background-color:transparent}jam-upload #picture-manager.mouseover div>.mouseover-child{display:none;-webkit-transition:display .3s;transition:display .3s}jam-upload #picture-manager.mouseover:hover div>.mouseover-child{display:inherit}jam-upload #picture-manager.mouseover:hover div>.mouseover-child .blur{top:0;bottom:0;left:0;right:0;-webkit-filter:blur(10px);-moz-filter:blur(10px);-ms-filter:blur(10px);-o-filter:blur(10px);filter:blur(10px);width:calc(100% + 40px);height:calc(100% + 40px);position:absolute;z-index:1;margin:-20px}jam-upload #picture-manager div mat-divider{width:60%;position:relative;border-color:#fff}jam-upload #picture-manager div{width:180px;height:180px;position:relative;background-size:cover;background-position:center}jam-upload #picture-manager.mouseover div>.mouseover-child .menu{z-index:3;position:absolute;top:0}jam-upload #picture-manager div>div.overlay{top:0;bottom:0;left:0;right:0;width:100%;height:100%;position:absolute;z-index:1;background-color:rgba(0,0,0,.376)}`]
            },] },
];
/** @nocollapse */
PictureManagerComponent.ctorParameters = () => [
    { type: HttpClient }
];
PictureManagerComponent.propDecorators = {
    type: [{ type: Input }],
    source: [{ type: Input }],
    deleteUrl: [{ type: Input }],
    uploadUrl: [{ type: Input }],
    showDeleteOption: [{ type: Input }],
    jamHeaders: [{ type: Input }],
    uploadChange: [{ type: Output }],
    response: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVyZS1tYW5hZ2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3BpY3R1cmUtbWFuYWdlci9waWN0dXJlL3BpY3R1cmUtbWFuYWdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFpQ2xELE1BQU0sT0FBTyx1QkFBdUI7SUF3QmhDLFlBQTZCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFabkMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBR2pEOzs7V0FHRztRQUNjLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQztRQUMvQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFFdEQsa0JBQWEsR0FBWSxLQUFLLENBQUM7SUFFZ0IsQ0FBQztJQUVoRCxRQUFRO1FBQ1gsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLGFBQXNCO1FBQzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxXQUFXLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTSxNQUFNO1FBQ1QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTtTQUMzQixDQUFDLENBQUMsU0FBUyxDQUNSLENBQUMsUUFBUSxFQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ25ELENBQUM7SUFFTyxjQUFjLENBQUMsTUFBYztRQUNqQyxJQUFJLGVBQWUsR0FBa0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RCxJQUFJLFFBQVEsR0FBVyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFN0MsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUNyQyxDQUFDOzs7WUEzRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0JiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLG1wREFBbXBELENBQUM7YUFDaHFEOzs7O1lBaENRLFVBQVU7OzttQkF5Q2QsS0FBSztxQkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzsrQkFDTCxLQUFLO3lCQUNMLEtBQUs7MkJBTUwsTUFBTTt1QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEltYWdlQ2hhbmdlIH0gZnJvbSAnLi9pbWFnZS1jaGFuZ2UtaW50ZXJmYWNlJztcbmltcG9ydCB7IFVwbG9hZE91dHB1dCB9IGZyb20gJ25neC11cGxvYWRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXBpY3R1cmUtbWFuYWdlcicsXG4gICAgdGVtcGxhdGU6IGA8amFtLXVwbG9hZCBbdXBsb2FkVXJsXT1cInVwbG9hZFVybFwiIChkcmFnQW5kRHJvcENoYW5nZSk9XCJkcmFnQW5kRHJvcFN0eWxlcygkZXZlbnQpXCIgKHNob3dQcmV2aWV3KT1cInNob3dQcmV2aWV3KCRldmVudClcIiBtYXQtaWNvbi1idXR0b24gZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiXG4gICAgW2phbUhlYWRlcnNdPVwiamFtSGVhZGVyc1wiXG4gICAgKHJlc3BvbnNlKT1cInJlc3BvbnNlLmVtaXQoJGV2ZW50KVwiXG4gICAgPlxuICAgIDxkaXYgKm5nSWY9XCJkcmFnX2FuZF9kcm9wXCIgW25nQ2xhc3NdPVwidHlwZSArICctZHJhZy1hbmQtZHJvcC1zdHlsZXMnXCI+PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIiFkcmFnX2FuZF9kcm9wXCIgaWQ9XCJwaWN0dXJlLW1hbmFnZXJcIiBjbGFzcz1cIm1vdXNlb3ZlclwiPlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInR5cGVcIiBbc3R5bGUuYmFja2dyb3VuZC1pbWFnZV09XCIndXJsKCcgKyBzb3VyY2UgKyAnKSdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb3VzZW92ZXItY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmx1clwiIFtzdHlsZS5iYWNrZ3JvdW5kLWltYWdlXT1cIid1cmwoJyArIHNvdXJjZSArICcpJ1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBtYXRUb29sdGlwPVwiU3ViaXIgaW1hZ2VuXCI+YWRkX2FfcGhvdG88L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwic2hvd0RlbGV0ZU9wdGlvblwiPjwvbWF0LWRpdmlkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8amFtLWRlbGV0ZS1jb25maXJtYXRpb24gKm5nSWY9XCJzaG93RGVsZXRlT3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVkXT1cInsgY29sb3I6ICd3aGl0ZScgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRlbGV0ZSk9XCJkZWxldGUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9qYW0tZGVsZXRlLWNvbmZpcm1hdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2phbS11cGxvYWQ+XG5gLFxuICAgIHN0eWxlczogW2BqYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKixqYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKj5tYXQtaWNvbnt3aWR0aDphdXRvO2hlaWdodDphdXRvfS5zcXVhcmV7Ym9yZGVyLXJhZGl1czoyJTtvdmVyZmxvdzpoaWRkZW59LnJvdW5ke2JvcmRlci1yYWRpdXM6NTAlO292ZXJmbG93OmhpZGRlbn0ucm91bmQtZHJhZy1hbmQtZHJvcC1zdHlsZXN7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4wNSk7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTgwcHg7aGVpZ2h0OjE4MHB4O3RvcDowO2xlZnQ6MDt6LWluZGV4OjMzMztiYWNrZ3JvdW5kLWltYWdlOnVybCgvYXNzZXRzL2ltYWdlcy9kcmFnX2FuZF9kcm9wLnBuZyk7Ym9yZGVyLXJhZGl1czo1MCV9LnNxdWFyZS1kcmFnLWFuZC1kcm9wLXN0eWxlc3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjA1KTtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxODBweDtoZWlnaHQ6MTgwcHg7dG9wOjA7bGVmdDowO3otaW5kZXg6MzMzO2JhY2tncm91bmQtaW1hZ2U6dXJsKC9hc3NldHMvaW1hZ2VzL2RyYWdfYW5kX2Ryb3AucG5nKX1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgKj5tYXQtaWNvbntjb2xvcjojZmZmO2ZvbnQtc2l6ZTo0LjVyZW19amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyLm1vdXNlb3Zlcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTpub25lOy13ZWJraXQtdHJhbnNpdGlvbjpkaXNwbGF5IC4zczt0cmFuc2l0aW9uOmRpc3BsYXkgLjNzfWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXI6aG92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGR7ZGlzcGxheTppbmhlcml0fWphbS11cGxvYWQgI3BpY3R1cmUtbWFuYWdlci5tb3VzZW92ZXI6aG92ZXIgZGl2Pi5tb3VzZW92ZXItY2hpbGQgLmJsdXJ7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7LXdlYmtpdC1maWx0ZXI6Ymx1cigxMHB4KTstbW96LWZpbHRlcjpibHVyKDEwcHgpOy1tcy1maWx0ZXI6Ymx1cigxMHB4KTstby1maWx0ZXI6Ymx1cigxMHB4KTtmaWx0ZXI6Ymx1cigxMHB4KTt3aWR0aDpjYWxjKDEwMCUgKyA0MHB4KTtoZWlnaHQ6Y2FsYygxMDAlICsgNDBweCk7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxO21hcmdpbjotMjBweH1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgZGl2IG1hdC1kaXZpZGVye3dpZHRoOjYwJTtwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXItY29sb3I6I2ZmZn1qYW0tdXBsb2FkICNwaWN0dXJlLW1hbmFnZXIgZGl2e3dpZHRoOjE4MHB4O2hlaWdodDoxODBweDtwb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXJ9amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyLm1vdXNlb3ZlciBkaXY+Lm1vdXNlb3Zlci1jaGlsZCAubWVudXt6LWluZGV4OjM7cG9zaXRpb246YWJzb2x1dGU7dG9wOjB9amFtLXVwbG9hZCAjcGljdHVyZS1tYW5hZ2VyIGRpdj5kaXYub3ZlcmxheXt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjM3Nil9YF1cbn0pXG5leHBvcnQgY2xhc3MgUGljdHVyZU1hbmFnZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qKlxuICAgICAqIElucHV0c1xuICAgICAqIEBwYXJhbSB0eXBlOiBkZXNjcmliZXMgdGhlIHNoYXBlIG9mIHRoZSBpbWFnZSBjb250YWluZXIsIHRoaXMgcGFyYW1ldGVyIGlzIG9wdGlvbmFsLi5cbiAgICAgKiBAcGFyYW0gc291cmNlOiBpcyBhIHVybCB0byByZWZlcmVuY2UgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIGRlbGV0ZVVybDogaXMgYSB1cmwgZm9yIGRlbGV0aW5nIGFuIGltYWdlLCB0aGlzIHBhcmFtZXRlciBpcyBvcHRpb25hbC5cbiAgICAgKiBAcGFyYW0gdXBsb2FkVXJsOiBpcyBhIHVybCBmb3IgdXBsb2FkaW5nIGFuIGltYWdlLCB0aGlzIHBhcmFtZXRlciBpcyBvcHRpb25hbC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgdHlwZTogJ3NxdWFyZScgfCAncm91bmQnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGVsZXRlVXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIHVwbG9hZFVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVsZXRlT3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgamFtSGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblxuICAgIC8qKlxuICAgICAqIE91dHB1dHNcbiAgICAgKiBAcGFyYW0gdXBsb2FkQ2hhbmdlOiB1cGRhdGVzIHRoZSBpbWFnZSBhbmQgcmV0dXJucyB0aGUgdXJsIGZvciBpdC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VDaGFuZ2U+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXI8VXBsb2FkT3V0cHV0PigpO1xuXG4gICAgcHVibGljIGRyYWdfYW5kX2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cENsaWVudDogSHR0cENsaWVudCkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nRGVmYXVsdFZhbHVlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmFnQW5kRHJvcFN0eWxlcyhkcmFnX2FuZF9kcm9wOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZHJhZ19hbmRfZHJvcCA9IGRyYWdfYW5kX2Ryb3A7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dQcmV2aWV3KGltYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5kZWxldGVVcmwgPSB0aGlzLmRlbGV0ZVVybCB8fCB0aGlzLnNvdXJjZTtcbiAgICAgICAgdGhpcy51cGxvYWRDaGFuZ2UuZW1pdCh7IHN0YXR1c19jaGFuZ2U6ICd1cGRhdGUnLCBzb3VyY2U6IHRoaXMuc291cmNlIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoKSB7XG4gICAgICAgIGxldCBkZWxldGVfdXJsID0gdGhpcy5jcmVhdERlbGV0ZVVybCh0aGlzLnNvdXJjZSk7XG4gICAgICAgIHRoaXMuaHR0cENsaWVudC5kZWxldGUoZGVsZXRlX3VybCwge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5qYW1IZWFkZXJzXG4gICAgICAgIH0pLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXNwb25zZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkQ2hhbmdlLmVtaXQoeyBzdGF0dXNfY2hhbmdlOiAnZGVsZXRlJywgc291cmNlOiB0aGlzLnNvdXJjZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHRpbmdEZWZhdWx0VmFsdWVzKCkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLnR5cGUgfHwgJ3NxdWFyZSc7XG4gICAgICAgIHRoaXMuZGVsZXRlVXJsID0gdGhpcy5kZWxldGVVcmwgfHwgdGhpcy5zb3VyY2U7XG4gICAgICAgIHRoaXMudXBsb2FkVXJsID0gdGhpcy51cGxvYWRVcmwgfHwgdGhpcy5zb3VyY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdERlbGV0ZVVybChzb3VyY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBpbWdfdXJsX3BhcnRpZXM6IEFycmF5PHN0cmluZz4gPSBzb3VyY2Uuc3BsaXQoJy8nKTtcbiAgICAgICAgbGV0IGltZ19uYW1lOiBzdHJpbmcgPSBpbWdfdXJsX3BhcnRpZXMucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlVXJsICsgaW1nX25hbWU7XG4gICAgfVxufVxuIl19