import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JamSelectModule } from './components/select/select.module';

@NgModule({
    imports: [CommonModule, JamSelectModule],
    exports: [
        // BrowserModule,  // needed by HttpClientModule?
        JamSelectModule,
        HttpClientModule
    ],
    providers: []
})
export class NgxJsonapiMaterialModule {
    public constructor(
        @Optional()
        @SkipSelf()
        parentModule: NgxJsonapiMaterialModule
    ) {
        if (parentModule) {
            throw new Error('NgxJsonapiMaterialModule is already loaded. Import it in the AppModule only');
        }
    }
}
