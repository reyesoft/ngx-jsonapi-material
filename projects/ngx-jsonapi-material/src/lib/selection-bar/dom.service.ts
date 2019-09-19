import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';

interface IChildConfig {
    inputs: object;
    outputs: object;
}

@Injectable()
export class DomService {
    private childComponentRef: ComponentRef<{}>;
    private child_dom_element_id = 'current-selection-bar';

    public constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    public appendComponentTo(parentId: string, child: any, childConfig?: IChildConfig): ComponentRef<any> {
        let child_node = document.getElementById(this.child_dom_element_id);
        if (child_node) child_node.parentNode.removeChild(child_node);

        /** Crea una referencia de componente desde el componente hijo */
        const childComponentRef = this.componentFactoryResolver.resolveComponentFactory(child).create(this.injector);

        /** Conecta la configuración al hijo (entradas y salidas) */
        this.attachConfig(childConfig, childComponentRef);

        this.childComponentRef = childComponentRef;
        // Agrega el componente al appRef de modo que esté dentro del árbol de componentes "ng"
        this.appRef.attachView(childComponentRef.hostView);

        // Obtiene el elemento DOM del componente
        const childDomElem = (childComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        childDomElem.setAttribute('id', this.child_dom_element_id);

        document.getElementById(parentId).appendChild(childDomElem);
        childDomElem.className = 'width-100';

        return childComponentRef;
    }

    public removeComponent() {
        if (!this.childComponentRef) return;
        this.appRef.detachView(this.childComponentRef.hostView);
        this.childComponentRef.destroy();
    }

    private attachConfig(config, componentRef) {
        let inputs = config.inputs;
        let outputs = config.outputs;
        for (let key in inputs) {
            componentRef.instance[key] = inputs[key];
        }
        for (let key in outputs) {
            componentRef.instance[key] = outputs[key];
        }
    }
}
