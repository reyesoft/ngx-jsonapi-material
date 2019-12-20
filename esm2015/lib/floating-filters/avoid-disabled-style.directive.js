import { Directive, ElementRef } from '@angular/core';
/**
 * Esta directive se usa en conjunto con la directive/attribute [disabled].
 * Es especial para los matExpansionPanel, cuando se aplican botones de acciones al header de este
 * y no se quiere abrir el matExpansionPanel, entonces esta directiv lo que hará es no aplicar los estilos apagado
 * que proporciona material cuando un elemento/tag esta des habilitado.
 */
export class AvoidDisabledStyleDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        const NATIVE_ELEMENT = this.elementRef.nativeElement;
        this.changes = new MutationObserver((mutations) => {
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
    ngOnDestroy() {
        this.changes.disconnect();
    }
    preservingOriginalStyles(mutation) {
        if (mutation.attributeName !== 'aria-disabled') {
            return;
        }
        let elements = document.getElementsByTagName(mutation.target.nodeName);
        for (let element of elements) {
            element.style.color = 'inherit';
        }
    }
}
AvoidDisabledStyleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[jamAvoidDisabledStyle]'
            },] },
];
/** @nocollapse */
AvoidDisabledStyleDirective.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZvaWQtZGlzYWJsZWQtc3R5bGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmxvYXRpbmctZmlsdGVycy9hdm9pZC1kaXNhYmxlZC1zdHlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQTZELE1BQU0sZUFBZSxDQUFDO0FBRWpIOzs7OztHQUtHO0FBS0gsTUFBTSxPQUFPLDJCQUEyQjtJQUdwQyxZQUEyQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQzdDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBRXJELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQWdDLEVBQVEsRUFBRTtZQUMzRSxLQUFLLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7WUFDakMsVUFBVSxFQUFFLElBQUk7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsYUFBYSxFQUFFLEtBQUs7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxRQUF3QjtRQUNyRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssZUFBZSxFQUFFO1lBQzVDLE9BQU87U0FDVjtRQUVELElBQUksUUFBUSxHQUFRLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVFLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztTQUNuQztJQUNMLENBQUM7OztZQW5DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjthQUN0Qzs7OztZQVhtQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBFc3RhIGRpcmVjdGl2ZSBzZSB1c2EgZW4gY29uanVudG8gY29uIGxhIGRpcmVjdGl2ZS9hdHRyaWJ1dGUgW2Rpc2FibGVkXS5cbiAqIEVzIGVzcGVjaWFsIHBhcmEgbG9zIG1hdEV4cGFuc2lvblBhbmVsLCBjdWFuZG8gc2UgYXBsaWNhbiBib3RvbmVzIGRlIGFjY2lvbmVzIGFsIGhlYWRlciBkZSBlc3RlXG4gKiB5IG5vIHNlIHF1aWVyZSBhYnJpciBlbCBtYXRFeHBhbnNpb25QYW5lbCwgZW50b25jZXMgZXN0YSBkaXJlY3RpdiBsbyBxdWUgaGFyw6EgZXMgbm8gYXBsaWNhciBsb3MgZXN0aWxvcyBhcGFnYWRvXG4gKiBxdWUgcHJvcG9yY2lvbmEgbWF0ZXJpYWwgY3VhbmRvIHVuIGVsZW1lbnRvL3RhZyBlc3RhIGRlcyBoYWJpbGl0YWRvLlxuICovXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2phbUF2b2lkRGlzYWJsZWRTdHlsZV0nXG59KVxuZXhwb3J0IGNsYXNzIEF2b2lkRGlzYWJsZWRTdHlsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBjaGFuZ2VzOiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBjb25zdCBOQVRJVkVfRUxFTUVOVCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuY2hhbmdlcyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnM6IEFycmF5PE11dGF0aW9uUmVjb3JkPik6IHZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzZXJ2aW5nT3JpZ2luYWxTdHlsZXMobXV0YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZXMub2JzZXJ2ZShOQVRJVkVfRUxFTUVOVCwge1xuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVzZXJ2aW5nT3JpZ2luYWxTdHlsZXMobXV0YXRpb246IE11dGF0aW9uUmVjb3JkKTogdm9pZCB7XG4gICAgICAgIGlmIChtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lICE9PSAnYXJpYS1kaXNhYmxlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtZW50czogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUobXV0YXRpb24udGFyZ2V0Lm5vZGVOYW1lKTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9ICdpbmhlcml0JztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==