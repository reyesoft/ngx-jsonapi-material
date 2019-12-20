import { ElementRef, OnDestroy } from '@angular/core';
/**
 * Esta directive se usa en conjunto con la directive/attribute [disabled].
 * Es especial para los matExpansionPanel, cuando se aplican botones de acciones al header de este
 * y no se quiere abrir el matExpansionPanel, entonces esta directiv lo que hará es no aplicar los estilos apagado
 * que proporciona material cuando un elemento/tag esta des habilitado.
 */
export declare class AvoidDisabledStyleDirective implements OnDestroy {
    private elementRef;
    private changes;
    constructor(elementRef: ElementRef);
    ngOnDestroy(): void;
    private preservingOriginalStyles;
}
