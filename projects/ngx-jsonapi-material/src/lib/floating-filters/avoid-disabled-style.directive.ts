import { Directive, ElementRef, AfterViewInit, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';

/**
 * Esta directive se usa en conjunto con la directive/attribute [disabled].
 * Es especial para los matExpansionPanel, cuando se aplican botones de acciones al header de este
 * y no se quiere abrir el matExpansionPanel, entonces esta directiv lo que hará es no aplicar los estilos apagado
 * que proporciona material cuando un elemento/tag esta des habilitado.
 */

@Directive({
    selector: '[jamAvoidDisabledStyle]'
})
export class AvoidDisabledStyleDirective implements OnDestroy {
    private changes: MutationObserver;

    public constructor(private elementRef: ElementRef) {
        const NATIVE_ELEMENT = this.elementRef.nativeElement;

        this.changes = new MutationObserver((mutations: Array<MutationRecord>): void => {
            for (let mutation of mutations) {
                this.preservingOriginalStyles(mutation);
            }
        });

        this.changes.observe(NATIVE_ELEMENT, {
            attributes: true,
            childList: false,
            characterData: false
        });
    }

    public ngOnDestroy() {
        this.changes.disconnect();
    }

    private preservingOriginalStyles(mutation: MutationRecord): void {
        if (mutation.attributeName !== 'aria-disabled') {
            return;
        }

        let elements: any = document.getElementsByTagName(mutation.target.nodeName);
        for (let element of elements) {
            element.style.color = 'inherit';
        }
    }
}
