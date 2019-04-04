import { Component } from '@angular/core';
import { JsonapiCore } from 'ngx-jsonapi';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'app';
    public loading = '';

    public constructor(private jsonapiCore: JsonapiCore) {
        jsonapiCore.loadingsStart = (): void => {
            this.loading = 'LOADING...';
        };
        jsonapiCore.loadingsDone = (): void => {
            this.loading = '';
        };
        jsonapiCore.loadingsOffline = (error: any): void => {
            this.loading = 'No connection!!!';
        };
        jsonapiCore.loadingsError = (error: any): void => {
            this.loading = 'No connection 2!!!';
        };
    }
}
