import { ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
interface IChildConfig {
    inputs: object;
    outputs: object;
}
export declare class DomService {
    private componentFactoryResolver;
    private appRef;
    private injector;
    private childComponentRef;
    private child_dom_element_id;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    appendComponentTo(parentId: string, child: any, childConfig?: IChildConfig): ComponentRef<any>;
    removeComponent(): void;
    private attachConfig;
}
export {};
