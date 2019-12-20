import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { humanizeBytes } from 'ngx-uploader';
export class UploadComponent {
    constructor(router) {
        this.router = router;
        this.data = {};
        this.disabled = false;
        this.showPreview = new EventEmitter();
        this.response = new EventEmitter();
        this.dragAndDropChange = new EventEmitter();
        this.dragOver = false;
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytesFunction = humanizeBytes;
    }
    onUploadOutput(output) {
        switch (output.type) {
            case 'allAddedToQueue':
                this.startUpload();
                break;
            case 'addedToQueue':
                if (typeof output.file !== 'undefined') {
                    this.previewImage(output.file);
                    this.files.push(output.file);
                }
                break;
            case 'uploading':
                if (typeof output.file !== 'undefined') {
                    // update current data in files array for uploading file
                    const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
                    this.files[index] = output.file;
                }
                break;
            case 'removed':
                // remove file from array when removed
                this.files = this.files.filter((file) => JSON.stringify(file) !== JSON.stringify(output.file));
                break;
            case 'dragOver':
                this.dragOver = true;
                this.dragAndDropChange.emit(this.dragOver);
                break;
            case 'dragOut':
            case 'drop':
                this.dragOver = false;
                this.dragAndDropChange.emit(this.dragOver);
                break;
            case 'done':
                if (this.redirect) {
                    this.router.navigate([this.router.url + '/' + output.file.response.id]);
                }
                break;
        }
        this.response.emit(output);
    }
    // The preview function
    previewImage(file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file.nativeFile || file.target.files[0]);
        fileReader.onload = (image) => {
            this.showPreview.emit(image.target.result);
        };
    }
    startUpload() {
        const event = {
            type: 'uploadAll',
            url: this.uploadUrl,
            method: 'POST',
            data: this.data,
            headers: this.jamHeaders
        };
        this.uploadInput.emit(event);
    }
    cancelUpload(id) {
        this.uploadInput.emit({ type: 'cancel', id: id });
    }
    removeFile(id) {
        this.uploadInput.emit({ type: 'remove', id: id });
    }
    removeAllFiles() {
        this.uploadInput.emit({ type: 'removeAll' });
    }
}
UploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'jam-upload',
                template: `<div>
    <div fxLayout="column" fxLayoutAlign="center center" ngFileDrop [options]="options" (uploadOutput)="onUploadOutput($event)" [uploadInput]="uploadInput">
        <label class="upload-button margin-0"
            style="display: inline-block;
                border: none;
                outline: none;
                cursor: pointer;"
            >
            <input style="display: none" type="file" class="layout-margin" ngFileSelect
                [uploadInput]="uploadInput"
                [disabled]="disabled"
                [options]="options"
                (change)="previewImage($event)"
                (uploadOutput)="onUploadOutput($event)"
                multiple>
            <ng-content></ng-content>
        </label>
    </div>
</div>
<div *ngFor="let f of files; let i = index;">
    <mat-spinner *ngIf="f.progress.data < 100"></mat-spinner>
</div>
`
            },] },
];
/** @nocollapse */
UploadComponent.ctorParameters = () => [
    { type: Router }
];
UploadComponent.propDecorators = {
    uploadUrl: [{ type: Input }],
    data: [{ type: Input }],
    redirect: [{ type: Input }],
    jamHeaders: [{ type: Input }],
    disabled: [{ type: Input }],
    uploadInput: [{ type: Output }],
    showPreview: [{ type: Output }],
    response: [{ type: Output }],
    dragAndDropChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3BpY3R1cmUtbWFuYWdlci91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQXlDLGFBQWEsRUFBbUIsTUFBTSxjQUFjLENBQUM7QUE0QnJHLE1BQU0sT0FBTyxlQUFlO0lBaUJ4QixZQUEwQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWZ4QixTQUFJLEdBQThCLEVBQUUsQ0FBQztRQUdyQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBTXpCLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsYUFBUSxHQUErQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFELHNCQUFpQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhFLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyw4QkFBOEI7UUFDL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDLENBQUMseURBQXlEO1FBQzdHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxhQUFhLENBQUM7SUFDL0MsQ0FBQztJQUVNLGNBQWMsQ0FBQyxNQUFvQjtRQUN0QyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDakIsS0FBSyxpQkFBaUI7Z0JBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsTUFBTTtZQUNWLEtBQUssY0FBYztnQkFDZixJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FB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QUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxVQUFVLENBQUMsRUFBVTtRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLGNBQWM7UUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7WUF4SEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FzQmI7YUFDQTs7OztZQTdCUSxNQUFNOzs7d0JBK0JWLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFLTCxNQUFNOzBCQUNOLE1BQU07dUJBQ04sTUFBTTtnQ0FDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFVwbG9hZE91dHB1dCwgVXBsb2FkSW5wdXQsIFVwbG9hZEZpbGUsIGh1bWFuaXplQnl0ZXMsIFVwbG9hZGVyT3B0aW9ucyB9IGZyb20gJ25neC11cGxvYWRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamFtLXVwbG9hZCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiIG5nRmlsZURyb3AgW29wdGlvbnNdPVwib3B0aW9uc1wiICh1cGxvYWRPdXRwdXQpPVwib25VcGxvYWRPdXRwdXQoJGV2ZW50KVwiIFt1cGxvYWRJbnB1dF09XCJ1cGxvYWRJbnB1dFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJ1cGxvYWQtYnV0dG9uIG1hcmdpbi0wXCJcbiAgICAgICAgICAgIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPGlucHV0IHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIHR5cGU9XCJmaWxlXCIgY2xhc3M9XCJsYXlvdXQtbWFyZ2luXCIgbmdGaWxlU2VsZWN0XG4gICAgICAgICAgICAgICAgW3VwbG9hZElucHV0XT1cInVwbG9hZElucHV0XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cIm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwicHJldmlld0ltYWdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICh1cGxvYWRPdXRwdXQpPVwib25VcGxvYWRPdXRwdXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgbXVsdGlwbGU+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nRm9yPVwibGV0IGYgb2YgZmlsZXM7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiZi5wcm9ncmVzcy5kYXRhIDwgMTAwXCI+PC9tYXQtc3Bpbm5lcj5cbjwvZGl2PlxuYFxufSlcbmV4cG9ydCBjbGFzcyBVcGxvYWRDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB1cGxvYWRVcmw6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgZGF0YTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyByZWRpcmVjdDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgamFtSGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaHR0cENsaWVudDogSHR0cENsaWVudDtcbiAgICBwdWJsaWMgb3B0aW9uczogVXBsb2FkZXJPcHRpb25zO1xuICAgIHB1YmxpYyBmb3JtRGF0YTogRm9ybURhdGE7XG4gICAgcHVibGljIGZpbGVzOiBBcnJheTxVcGxvYWRGaWxlPjtcbiAgICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZElucHV0OiBFdmVudEVtaXR0ZXI8VXBsb2FkSW5wdXQ+O1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2hvd1ByZXZpZXc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVzcG9uc2U6IEV2ZW50RW1pdHRlcjxVcGxvYWRPdXRwdXQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZHJhZ0FuZERyb3BDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBwdWJsaWMgaHVtYW5pemVCeXRlc0Z1bmN0aW9uOiBGdW5jdGlvbjtcbiAgICBwdWJsaWMgZHJhZ092ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdOyAvLyBsb2NhbCB1cGxvYWRpbmcgZmlsZXMgYXJyYXlcbiAgICAgICAgdGhpcy51cGxvYWRJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8VXBsb2FkSW5wdXQ+KCk7IC8vIGlucHV0IGV2ZW50cywgd2UgdXNlIHRoaXMgdG8gZW1pdCBkYXRhIHRvIG5neC11cGxvYWRlclxuICAgICAgICB0aGlzLmh1bWFuaXplQnl0ZXNGdW5jdGlvbiA9IGh1bWFuaXplQnl0ZXM7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVXBsb2FkT3V0cHV0KG91dHB1dDogVXBsb2FkT3V0cHV0KTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAob3V0cHV0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FsbEFkZGVkVG9RdWV1ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFVwbG9hZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYWRkZWRUb1F1ZXVlJzpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG91dHB1dC5maWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdJbWFnZShvdXRwdXQuZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMucHVzaChvdXRwdXQuZmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndXBsb2FkaW5nJzpcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG91dHB1dC5maWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgY3VycmVudCBkYXRhIGluIGZpbGVzIGFycmF5IGZvciB1cGxvYWRpbmcgZmlsZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmlsZXMuZmluZEluZGV4KGZpbGUgPT4gdHlwZW9mIG91dHB1dC5maWxlICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlLmlkID09PSBvdXRwdXQuZmlsZS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZXNbaW5kZXhdID0gb3V0cHV0LmZpbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVtb3ZlZCc6XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZpbGUgZnJvbSBhcnJheSB3aGVuIHJlbW92ZWRcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoKGZpbGU6IFVwbG9hZEZpbGUpID0+IEpTT04uc3RyaW5naWZ5KGZpbGUpICE9PSBKU09OLnN0cmluZ2lmeShvdXRwdXQuZmlsZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJhZ092ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0FuZERyb3BDaGFuZ2UuZW1pdCh0aGlzLmRyYWdPdmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RyYWdPdXQnOlxuICAgICAgICAgICAgY2FzZSAnZHJvcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0FuZERyb3BDaGFuZ2UuZW1pdCh0aGlzLmRyYWdPdmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RvbmUnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlZGlyZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlci51cmwgKyAnLycgKyBvdXRwdXQuZmlsZS5yZXNwb25zZS5pZF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3BvbnNlLmVtaXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICAvLyBUaGUgcHJldmlldyBmdW5jdGlvblxuICAgIHB1YmxpYyBwcmV2aWV3SW1hZ2UoZmlsZTogYW55KSB7XG4gICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlLm5hdGl2ZUZpbGUgfHwgZmlsZS50YXJnZXQuZmlsZXNbMF0pO1xuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IChpbWFnZTogYW55KTogYW55ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ByZXZpZXcuZW1pdChpbWFnZS50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnRVcGxvYWQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBVcGxvYWRJbnB1dCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICd1cGxvYWRBbGwnLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVwbG9hZFVybCxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLCAvLyBhZ2VyZ2FyIGRhdG9zXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmphbUhlYWRlcnNcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51cGxvYWRJbnB1dC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FuY2VsVXBsb2FkKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGxvYWRJbnB1dC5lbWl0KHsgdHlwZTogJ2NhbmNlbCcsIGlkOiBpZCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRmlsZShpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBsb2FkSW5wdXQuZW1pdCh7IHR5cGU6ICdyZW1vdmUnLCBpZDogaWQgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUFsbEZpbGVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwbG9hZElucHV0LmVtaXQoeyB0eXBlOiAncmVtb3ZlQWxsJyB9KTtcbiAgICB9XG59XG4iXX0=