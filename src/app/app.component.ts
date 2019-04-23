import { Component } from '@angular/core';
import { JsonapiCore } from 'ngx-jsonapi';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'app';
    public loading = '';

    public example_key = '213';

    public constructor(private router: Router, private activatedRoute: ActivatedRoute, private jsonapiCore: JsonapiCore) {
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

    public optionSelected(option): void {
        this.router.navigate([option.label], { relativeTo: this.activatedRoute });
    }
}
