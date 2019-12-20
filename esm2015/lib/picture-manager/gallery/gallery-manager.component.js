import { Component, Output, Input, EventEmitter } from '@angular/core';
export class GalleryManagerComponent {
    constructor() {
        this.updatePicture = '/photos/';
        this.showDeleteOption = true;
        /**
         * @param  {number} highlightedImage
         * Position in the array of the highlighted image, by default is the position 0.
         */
        this.highlightedImage = 0;
        this.addPicture = new EventEmitter();
        this.responsePicture = new EventEmitter();
        this.image_loading = false;
    }
    ngOnInit() {
        this.highlightedImage = this.highlightedImage || 0;
    }
    showPreview(img) {
        this.addPicture.emit(img);
    }
    response(event) {
        if (event.type !== 'done') {
            this.image_loading = true;
            return;
        }
        this.image_loading = false;
        this.responsePicture.emit(event.file.response.data);
    }
}
GalleryManagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-gallery-manager',
                template: `<div *ngFor="let picture of pictures; let position = index">
    <mat-card class="mat-card-flat padding-0 container-gallery-manager"
        *ngIf="limit ? position <= limit : true"
        [matTooltip]="highlightedImage == position ? 'Imagen principal' : null"
        [ngClass]="highlightedImage == position ? 'mat-icon mat-accent highlighted-image-container' : null"
    >
        <mat-icon color="accent" *ngIf="highlightedImage == position"
            class="highlighted-image"
        >collections_bookmark</mat-icon>
        <jam-picture-manager
            [showDeleteOption]="showDeleteOption"
            [source]="picture.attributes.url"
            [uploadUrl]="uploadUrl + updatePicture + picture.id"
            [jamHeaders]="jamHeaders"
        ></jam-picture-manager>
    </mat-card>
</div>
<jam-upload id="gallery-manager" [uploadUrl]="uploadUrl" (showPreview)="showPreview($event)"
    *ngIf="pictures && pictures.length < limit" class="container-gallery-manager"
    [disabled]="image_loading"
    (response)="response($event)"
    mat-icon-button matTooltip="Subir imagen"
    [jamHeaders]="jamHeaders">
    <mat-icon id="base-icon" [ngClass]="image_loading ? 'disabled-update' : null">add_a_photo</mat-icon>
    <mat-progress-spinner class="elements-up default"
        class="loading-position"
        *ngIf="image_loading"
        mode="indeterminate"
        value="value"
        diameter="42"
        aria-label="Cargando Espere">
    </mat-progress-spinner>
</jam-upload>
`,
                styles: [`jam-upload #gallery-manager{width:auto;height:100%}#base-icon{width:auto;height:auto;font-size:8rem}.container-gallery-manager{position:relative;border-radius:inherit}.highlighted-image-container{height:auto!important;width:auto!important;--color:currentColor;border:2px solid var(--color)}.highlighted-image{padding:2px;box-sizing:content-box;background:inherit;border-radius:10%;position:absolute;top:-10px;left:calc(100% - 14px);z-index:2}.loading-position{position:absolute;top:54px;left:48px}.disabled-update{opacity:.3}`]
            },] },
];
GalleryManagerComponent.propDecorators = {
    pictures: [{ type: Input }],
    uploadUrl: [{ type: Input }],
    updatePicture: [{ type: Input }],
    limit: [{ type: Input }],
    showDeleteOption: [{ type: Input }],
    jamHeaders: [{ type: Input }],
    highlightedImage: [{ type: Input }],
    addPicture: [{ type: Output }],
    responsePicture: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1tYW5hZ2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3BpY3R1cmUtbWFuYWdlci9nYWxsZXJ5L2dhbGxlcnktbWFuYWdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXlDL0UsTUFBTSxPQUFPLHVCQUF1QjtJQXRDcEM7UUF5Q29CLGtCQUFhLEdBQVcsVUFBVSxDQUFDO1FBRW5DLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUVqRDs7O1dBR0c7UUFDYSxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFNUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBWSxDQUFDO1FBRXpELGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBbUIxQyxDQUFDO0lBakJVLFFBQVE7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0sV0FBVyxDQUFDLEdBQUc7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFLO1FBQ2pCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFFMUIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBeEVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWlDYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQywrZ0JBQStnQixDQUFDO2FBQzVoQjs7O3VCQUVJLEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxLQUFLO29CQUNMLEtBQUs7K0JBQ0wsS0FBSzt5QkFDTCxLQUFLOytCQUtMLEtBQUs7eUJBRUwsTUFBTTs4QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLWdhbGxlcnktbWFuYWdlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0Zvcj1cImxldCBwaWN0dXJlIG9mIHBpY3R1cmVzOyBsZXQgcG9zaXRpb24gPSBpbmRleFwiPlxuICAgIDxtYXQtY2FyZCBjbGFzcz1cIm1hdC1jYXJkLWZsYXQgcGFkZGluZy0wIGNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJcIlxuICAgICAgICAqbmdJZj1cImxpbWl0ID8gcG9zaXRpb24gPD0gbGltaXQgOiB0cnVlXCJcbiAgICAgICAgW21hdFRvb2x0aXBdPVwiaGlnaGxpZ2h0ZWRJbWFnZSA9PSBwb3NpdGlvbiA/ICdJbWFnZW4gcHJpbmNpcGFsJyA6IG51bGxcIlxuICAgICAgICBbbmdDbGFzc109XCJoaWdobGlnaHRlZEltYWdlID09IHBvc2l0aW9uID8gJ21hdC1pY29uIG1hdC1hY2NlbnQgaGlnaGxpZ2h0ZWQtaW1hZ2UtY29udGFpbmVyJyA6IG51bGxcIlxuICAgID5cbiAgICAgICAgPG1hdC1pY29uIGNvbG9yPVwiYWNjZW50XCIgKm5nSWY9XCJoaWdobGlnaHRlZEltYWdlID09IHBvc2l0aW9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaGlnaGxpZ2h0ZWQtaW1hZ2VcIlxuICAgICAgICA+Y29sbGVjdGlvbnNfYm9va21hcms8L21hdC1pY29uPlxuICAgICAgICA8amFtLXBpY3R1cmUtbWFuYWdlclxuICAgICAgICAgICAgW3Nob3dEZWxldGVPcHRpb25dPVwic2hvd0RlbGV0ZU9wdGlvblwiXG4gICAgICAgICAgICBbc291cmNlXT1cInBpY3R1cmUuYXR0cmlidXRlcy51cmxcIlxuICAgICAgICAgICAgW3VwbG9hZFVybF09XCJ1cGxvYWRVcmwgKyB1cGRhdGVQaWN0dXJlICsgcGljdHVyZS5pZFwiXG4gICAgICAgICAgICBbamFtSGVhZGVyc109XCJqYW1IZWFkZXJzXCJcbiAgICAgICAgPjwvamFtLXBpY3R1cmUtbWFuYWdlcj5cbiAgICA8L21hdC1jYXJkPlxuPC9kaXY+XG48amFtLXVwbG9hZCBpZD1cImdhbGxlcnktbWFuYWdlclwiIFt1cGxvYWRVcmxdPVwidXBsb2FkVXJsXCIgKHNob3dQcmV2aWV3KT1cInNob3dQcmV2aWV3KCRldmVudClcIlxuICAgICpuZ0lmPVwicGljdHVyZXMgJiYgcGljdHVyZXMubGVuZ3RoIDwgbGltaXRcIiBjbGFzcz1cImNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJcIlxuICAgIFtkaXNhYmxlZF09XCJpbWFnZV9sb2FkaW5nXCJcbiAgICAocmVzcG9uc2UpPVwicmVzcG9uc2UoJGV2ZW50KVwiXG4gICAgbWF0LWljb24tYnV0dG9uIG1hdFRvb2x0aXA9XCJTdWJpciBpbWFnZW5cIlxuICAgIFtqYW1IZWFkZXJzXT1cImphbUhlYWRlcnNcIj5cbiAgICA8bWF0LWljb24gaWQ9XCJiYXNlLWljb25cIiBbbmdDbGFzc109XCJpbWFnZV9sb2FkaW5nID8gJ2Rpc2FibGVkLXVwZGF0ZScgOiBudWxsXCI+YWRkX2FfcGhvdG88L21hdC1pY29uPlxuICAgIDxtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciBjbGFzcz1cImVsZW1lbnRzLXVwIGRlZmF1bHRcIlxuICAgICAgICBjbGFzcz1cImxvYWRpbmctcG9zaXRpb25cIlxuICAgICAgICAqbmdJZj1cImltYWdlX2xvYWRpbmdcIlxuICAgICAgICBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiXG4gICAgICAgIHZhbHVlPVwidmFsdWVcIlxuICAgICAgICBkaWFtZXRlcj1cIjQyXCJcbiAgICAgICAgYXJpYS1sYWJlbD1cIkNhcmdhbmRvIEVzcGVyZVwiPlxuICAgIDwvbWF0LXByb2dyZXNzLXNwaW5uZXI+XG48L2phbS11cGxvYWQ+XG5gLFxuICAgIHN0eWxlczogW2BqYW0tdXBsb2FkICNnYWxsZXJ5LW1hbmFnZXJ7d2lkdGg6YXV0bztoZWlnaHQ6MTAwJX0jYmFzZS1pY29ue3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87Zm9udC1zaXplOjhyZW19LmNvbnRhaW5lci1nYWxsZXJ5LW1hbmFnZXJ7cG9zaXRpb246cmVsYXRpdmU7Ym9yZGVyLXJhZGl1czppbmhlcml0fS5oaWdobGlnaHRlZC1pbWFnZS1jb250YWluZXJ7aGVpZ2h0OmF1dG8haW1wb3J0YW50O3dpZHRoOmF1dG8haW1wb3J0YW50Oy0tY29sb3I6Y3VycmVudENvbG9yO2JvcmRlcjoycHggc29saWQgdmFyKC0tY29sb3IpfS5oaWdobGlnaHRlZC1pbWFnZXtwYWRkaW5nOjJweDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O2JhY2tncm91bmQ6aW5oZXJpdDtib3JkZXItcmFkaXVzOjEwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwcHg7bGVmdDpjYWxjKDEwMCUgLSAxNHB4KTt6LWluZGV4OjJ9LmxvYWRpbmctcG9zaXRpb257cG9zaXRpb246YWJzb2x1dGU7dG9wOjU0cHg7bGVmdDo0OHB4fS5kaXNhYmxlZC11cGRhdGV7b3BhY2l0eTouM31gXVxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5TWFuYWdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHBpY3R1cmVzOiBBcnJheTxSZXNvdXJjZSB8IGFueT47XG4gICAgQElucHV0KCkgcHVibGljIHVwbG9hZFVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyB1cGRhdGVQaWN0dXJlOiBzdHJpbmcgPSAnL3Bob3Rvcy8nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBsaW1pdDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzaG93RGVsZXRlT3B0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgamFtSGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9IGhpZ2hsaWdodGVkSW1hZ2VcbiAgICAgKiBQb3NpdGlvbiBpbiB0aGUgYXJyYXkgb2YgdGhlIGhpZ2hsaWdodGVkIGltYWdlLCBieSBkZWZhdWx0IGlzIHRoZSBwb3NpdGlvbiAwLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBoaWdobGlnaHRlZEltYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgQE91dHB1dCgpIHB1YmxpYyBhZGRQaWN0dXJlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyByZXNwb25zZVBpY3R1cmUgPSBuZXcgRXZlbnRFbWl0dGVyPFJlc291cmNlPigpO1xuXG4gICAgcHVibGljIGltYWdlX2xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRlZEltYWdlID0gdGhpcy5oaWdobGlnaHRlZEltYWdlIHx8IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dQcmV2aWV3KGltZykge1xuICAgICAgICB0aGlzLmFkZFBpY3R1cmUuZW1pdChpbWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNwb25zZShldmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSAhPT0gJ2RvbmUnKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlX2xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbWFnZV9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzcG9uc2VQaWN0dXJlLmVtaXQoZXZlbnQuZmlsZS5yZXNwb25zZS5kYXRhKTtcbiAgICB9XG59XG4iXX0=