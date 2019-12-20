import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { humanizeBytes } from 'ngx-uploader';
var UploadComponent = /** @class */ (function () {
    function UploadComponent(router) {
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
    UploadComponent.prototype.onUploadOutput = function (output) {
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
                    var index = this.files.findIndex(function (file) { return typeof output.file !== 'undefined' && file.id === output.file.id; });
                    this.files[index] = output.file;
                }
                break;
            case 'removed':
                // remove file from array when removed
                this.files = this.files.filter(function (file) { return JSON.stringify(file) !== JSON.stringify(output.file); });
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
    };
    // The preview function
    UploadComponent.prototype.previewImage = function (file) {
        var _this = this;
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file.nativeFile || file.target.files[0]);
        fileReader.onload = function (image) {
            _this.showPreview.emit(image.target.result);
        };
    };
    UploadComponent.prototype.startUpload = function () {
        var event = {
            type: 'uploadAll',
            url: this.uploadUrl,
            method: 'POST',
            data: this.data,
            headers: this.jamHeaders
        };
        this.uploadInput.emit(event);
    };
    UploadComponent.prototype.cancelUpload = function (id) {
        this.uploadInput.emit({ type: 'cancel', id: id });
    };
    UploadComponent.prototype.removeFile = function (id) {
        this.uploadInput.emit({ type: 'remove', id: id });
    };
    UploadComponent.prototype.removeAllFiles = function () {
        this.uploadInput.emit({ type: 'removeAll' });
    };
    UploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jam-upload',
                    template: "<div>\n    <div fxLayout=\"column\" fxLayoutAlign=\"center center\" ngFileDrop [options]=\"options\" (uploadOutput)=\"onUploadOutput($event)\" [uploadInput]=\"uploadInput\">\n        <label class=\"upload-button margin-0\"\n            style=\"display: inline-block;\n                border: none;\n                outline: none;\n                cursor: pointer;\"\n            >\n            <input style=\"display: none\" type=\"file\" class=\"layout-margin\" ngFileSelect\n                [uploadInput]=\"uploadInput\"\n                [disabled]=\"disabled\"\n                [options]=\"options\"\n                (change)=\"previewImage($event)\"\n                (uploadOutput)=\"onUploadOutput($event)\"\n                multiple>\n            <ng-content></ng-content>\n        </label>\n    </div>\n</div>\n<div *ngFor=\"let f of files; let i = index;\">\n    <mat-spinner *ngIf=\"f.progress.data < 100\"></mat-spinner>\n</div>\n"
                },] },
    ];
    /** @nocollapse */
    UploadComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
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
    return UploadComponent;
}());
export { UploadComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3BpY3R1cmUtbWFuYWdlci91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQXlDLGFBQWEsRUFBbUIsTUFBTSxjQUFjLENBQUM7QUFFckc7SUEyQ0kseUJBQTBCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBZnhCLFNBQUksR0FBOEIsRUFBRSxDQUFDO1FBR3JDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFNekIsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxhQUFRLEdBQStCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUQsc0JBQWlCLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEUsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUc3QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLDhCQUE4QjtRQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFlLENBQUMsQ0FBQyx5REFBeUQ7UUFDN0csSUFBSSxDQUFDLHFCQUFxQixHQUFHLGFBQWEsQ0FBQztJQUMvQyxDQUFDO0lBRU0sd0NBQWMsR0FBckIsVUFBc0IsTUFBb0I7UUFDdEMsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2pCLEtBQUssaUJBQWlCO2dCQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLE1BQU07WUFDVixLQUFLLGNBQWM7Z0JBQ2YsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxF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b0IsRUFBVTtRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLG9DQUFVLEdBQWpCLFVBQWtCLEVBQVU7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSx3Q0FBYyxHQUFyQjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Z0JBeEhKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLDg2QkFzQmI7aUJBQ0E7Ozs7Z0JBN0JRLE1BQU07Ozs0QkErQlYsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUtMLE1BQU07OEJBQ04sTUFBTTsyQkFDTixNQUFNO29DQUNOLE1BQU07O0lBa0ZYLHNCQUFDO0NBQUEsQUF6SEQsSUF5SEM7U0EvRlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBVcGxvYWRPdXRwdXQsIFVwbG9hZElucHV0LCBVcGxvYWRGaWxlLCBodW1hbml6ZUJ5dGVzLCBVcGxvYWRlck9wdGlvbnMgfSBmcm9tICduZ3gtdXBsb2FkZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2phbS11cGxvYWQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIiBuZ0ZpbGVEcm9wIFtvcHRpb25zXT1cIm9wdGlvbnNcIiAodXBsb2FkT3V0cHV0KT1cIm9uVXBsb2FkT3V0cHV0KCRldmVudClcIiBbdXBsb2FkSW5wdXRdPVwidXBsb2FkSW5wdXRcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwidXBsb2FkLWJ1dHRvbiBtYXJnaW4tMFwiXG4gICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB0eXBlPVwiZmlsZVwiIGNsYXNzPVwibGF5b3V0LW1hcmdpblwiIG5nRmlsZVNlbGVjdFxuICAgICAgICAgICAgICAgIFt1cGxvYWRJbnB1dF09XCJ1cGxvYWRJbnB1dFwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCJcbiAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInByZXZpZXdJbWFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAodXBsb2FkT3V0cHV0KT1cIm9uVXBsb2FkT3V0cHV0KCRldmVudClcIlxuICAgICAgICAgICAgICAgIG11bHRpcGxlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuPC9kaXY+XG48ZGl2ICpuZ0Zvcj1cImxldCBmIG9mIGZpbGVzOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgIDxtYXQtc3Bpbm5lciAqbmdJZj1cImYucHJvZ3Jlc3MuZGF0YSA8IDEwMFwiPjwvbWF0LXNwaW5uZXI+XG48L2Rpdj5cbmBcbn0pXG5leHBvcnQgY2xhc3MgVXBsb2FkQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgdXBsb2FkVXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGRhdGE6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgICBASW5wdXQoKSBwdWJsaWMgcmVkaXJlY3Q6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIGphbUhlYWRlcnM6IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQ7XG4gICAgcHVibGljIG9wdGlvbnM6IFVwbG9hZGVyT3B0aW9ucztcbiAgICBwdWJsaWMgZm9ybURhdGE6IEZvcm1EYXRhO1xuICAgIHB1YmxpYyBmaWxlczogQXJyYXk8VXBsb2FkRmlsZT47XG4gICAgQE91dHB1dCgpIHB1YmxpYyB1cGxvYWRJbnB1dDogRXZlbnRFbWl0dGVyPFVwbG9hZElucHV0PjtcbiAgICBAT3V0cHV0KCkgcHVibGljIHNob3dQcmV2aWV3OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlc3BvbnNlOiBFdmVudEVtaXR0ZXI8VXBsb2FkT3V0cHV0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIGRyYWdBbmREcm9wQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgcHVibGljIGh1bWFuaXplQnl0ZXNGdW5jdGlvbjogRnVuY3Rpb247XG4gICAgcHVibGljIGRyYWdPdmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTsgLy8gbG9jYWwgdXBsb2FkaW5nIGZpbGVzIGFycmF5XG4gICAgICAgIHRoaXMudXBsb2FkSW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPFVwbG9hZElucHV0PigpOyAvLyBpbnB1dCBldmVudHMsIHdlIHVzZSB0aGlzIHRvIGVtaXQgZGF0YSB0byBuZ3gtdXBsb2FkZXJcbiAgICAgICAgdGhpcy5odW1hbml6ZUJ5dGVzRnVuY3Rpb24gPSBodW1hbml6ZUJ5dGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblVwbG9hZE91dHB1dChvdXRwdXQ6IFVwbG9hZE91dHB1dCk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKG91dHB1dC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdhbGxBZGRlZFRvUXVldWUnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRVcGxvYWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2FkZGVkVG9RdWV1ZSc6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQuZmlsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3SW1hZ2Uob3V0cHV0LmZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVzLnB1c2gob3V0cHV0LmZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3VwbG9hZGluZyc6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvdXRwdXQuZmlsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIGN1cnJlbnQgZGF0YSBpbiBmaWxlcyBhcnJheSBmb3IgdXBsb2FkaW5nIGZpbGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbGVzLmZpbmRJbmRleChmaWxlID0+IHR5cGVvZiBvdXRwdXQuZmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZS5pZCA9PT0gb3V0cHV0LmZpbGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVzW2luZGV4XSA9IG91dHB1dC5maWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZWQnOlxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmaWxlIGZyb20gYXJyYXkgd2hlbiByZW1vdmVkXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHRoaXMuZmlsZXMuZmlsdGVyKChmaWxlOiBVcGxvYWRGaWxlKSA9PiBKU09OLnN0cmluZ2lmeShmaWxlKSAhPT0gSlNPTi5zdHJpbmdpZnkob3V0cHV0LmZpbGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RyYWdPdmVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdBbmREcm9wQ2hhbmdlLmVtaXQodGhpcy5kcmFnT3Zlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnT3V0JzpcbiAgICAgICAgICAgIGNhc2UgJ2Ryb3AnOlxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdBbmREcm9wQ2hhbmdlLmVtaXQodGhpcy5kcmFnT3Zlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb25lJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWRpcmVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZXIudXJsICsgJy8nICsgb3V0cHV0LmZpbGUucmVzcG9uc2UuaWRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNwb25zZS5lbWl0KG91dHB1dCk7XG4gICAgfVxuXG4gICAgLy8gVGhlIHByZXZpZXcgZnVuY3Rpb25cbiAgICBwdWJsaWMgcHJldmlld0ltYWdlKGZpbGU6IGFueSkge1xuICAgICAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZS5uYXRpdmVGaWxlIHx8IGZpbGUudGFyZ2V0LmZpbGVzWzBdKTtcbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSAoaW1hZ2U6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcmV2aWV3LmVtaXQoaW1hZ2UudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0VXBsb2FkKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogVXBsb2FkSW5wdXQgPSB7XG4gICAgICAgICAgICB0eXBlOiAndXBsb2FkQWxsJyxcbiAgICAgICAgICAgIHVybDogdGhpcy51cGxvYWRVcmwsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSwgLy8gYWdlcmdhciBkYXRvc1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5qYW1IZWFkZXJzXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudXBsb2FkSW5wdXQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbmNlbFVwbG9hZChpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBsb2FkSW5wdXQuZW1pdCh7IHR5cGU6ICdjYW5jZWwnLCBpZDogaWQgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUZpbGUoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwbG9hZElucHV0LmVtaXQoeyB0eXBlOiAncmVtb3ZlJywgaWQ6IGlkIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVBbGxGaWxlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGxvYWRJbnB1dC5lbWl0KHsgdHlwZTogJ3JlbW92ZUFsbCcgfSk7XG4gICAgfVxufVxuIl19