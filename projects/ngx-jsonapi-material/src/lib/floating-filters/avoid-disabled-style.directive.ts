import { Directive, ElementRef, AfterViewInit } from '@angular/core';

/**
 * Esta directive se usa en conjunto con la directive/attribute [disabled].
 * Es especial para los matExpansionPanel, cuando se aplican botones de acciones al header de este
 * y no se quiere abrir el matExpansionPanel, entonces esta directiv lo que hará es no aplicar los estilos apagado
 * que proporciona material cuando un elemento/tag esta des habilitado.
 */

@Directive({
    selector: '[jamAvoidDisabledStyle]'
})
export class AvoidDisabledStyleDirective implements AfterViewInit {
    public constructor(private elementRef: ElementRef) {}

    public ngAfterViewInit() {
        let native_element = this.elementRef.nativeElement;

        for (let attribute of native_element.attributes) {
            if (attribute.nodeName === 'aria-disabled') {
                attribute.value = false;
            }
        }
    }
}
