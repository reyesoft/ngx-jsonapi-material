import * as tslib_1 from "tslib";
import { Directive, ElementRef } from '@angular/core';
/**
 * Esta directive se usa en conjunto con la directive/attribute [disabled].
 * Es especial para los matExpansionPanel, cuando se aplican botones de acciones al header de este
 * y no se quiere abrir el matExpansionPanel, entonces esta directiv lo que hará es no aplicar los estilos apagado
 * que proporciona material cuando un elemento/tag esta des habilitado.
 */
var AvoidDisabledStyleDirective = /** @class */ (function () {
    function AvoidDisabledStyleDirective(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        var NATIVE_ELEMENT = this.elementRef.nativeElement;
        this.changes = new MutationObserver(function (mutations) {
            var e_1, _a;
            try {
                for (var mutations_1 = tslib_1.__values(mutations), mutations_1_1 = mutations_1.next(); !mutations_1_1.done; mutations_1_1 = mutations_1.next()) {
                    var mutation = mutations_1_1.value;
                    _this.preservingOriginalStyles(mutation);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (mutations_1_1 && !mutations_1_1.done && (_a = mutations_1.return)) _a.call(mutations_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
        this.changes.observe(NATIVE_ELEMENT, {
            attributes: true,
            childList: false,
            characterData: false
        });
    }
    AvoidDisabledStyleDirective.prototype.ngOnDestroy = function () {
        this.changes.disconnect();
    };
    AvoidDisabledStyleDirective.prototype.preservingOriginalStyles = function (mutation) {
        var e_2, _a;
        if (mutation.attributeName !== 'aria-disabled') {
            return;
        }
        var elements = document.getElementsByTagName(mutation.target.nodeName);
        try {
            for (var elements_1 = tslib_1.__values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                var element = elements_1_1.value;
                element.style.color = 'inherit';
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    AvoidDisabledStyleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[jamAvoidDisabledStyle]'
                },] },
    ];
    /** @nocollapse */
    AvoidDisabledStyleDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return AvoidDisabledStyleDirective;
}());
export { AvoidDisabledStyleDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZvaWQtZGlzYWJsZWQtc3R5bGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmxvYXRpbmctZmlsdGVycy9hdm9pZC1kaXNhYmxlZC1zdHlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUE2RCxNQUFNLGVBQWUsQ0FBQztBQUVqSDs7Ozs7R0FLRztBQUVIO0lBTUkscUNBQTJCLFVBQXNCO1FBQWpELGlCQWNDO1FBZDBCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDN0MsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFFckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQUMsU0FBZ0M7OztnQkFDakUsS0FBcUIsSUFBQSxjQUFBLGlCQUFBLFNBQVMsQ0FBQSxvQ0FBQSwyREFBRTtvQkFBM0IsSUFBSSxRQUFRLHNCQUFBO29CQUNiLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDM0M7Ozs7Ozs7OztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO1lBQ2pDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLGFBQWEsRUFBRSxLQUFLO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxpREFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVPLDhEQUF3QixHQUFoQyxVQUFpQyxRQUF3Qjs7UUFDckQsSUFBSSxRQUFRLENBQUMsYUFBYSxLQUFLLGVBQWUsRUFBRTtZQUM1QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBUSxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFDNUUsS0FBb0IsSUFBQSxhQUFBLGlCQUFBLFFBQVEsQ0FBQSxrQ0FBQSx3REFBRTtnQkFBekIsSUFBSSxPQUFPLHFCQUFBO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQzthQUNuQzs7Ozs7Ozs7O0lBQ0wsQ0FBQzs7Z0JBbkNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUseUJBQXlCO2lCQUN0Qzs7OztnQkFYbUIsVUFBVTs7SUE2QzlCLGtDQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FqQ1ksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBFc3RhIGRpcmVjdGl2ZSBzZSB1c2EgZW4gY29uanVudG8gY29uIGxhIGRpcmVjdGl2ZS9hdHRyaWJ1dGUgW2Rpc2FibGVkXS5cbiAqIEVzIGVzcGVjaWFsIHBhcmEgbG9zIG1hdEV4cGFuc2lvblBhbmVsLCBjdWFuZG8gc2UgYXBsaWNhbiBib3RvbmVzIGRlIGFjY2lvbmVzIGFsIGhlYWRlciBkZSBlc3RlXG4gKiB5IG5vIHNlIHF1aWVyZSBhYnJpciBlbCBtYXRFeHBhbnNpb25QYW5lbCwgZW50b25jZXMgZXN0YSBkaXJlY3RpdiBsbyBxdWUgaGFyw6EgZXMgbm8gYXBsaWNhciBsb3MgZXN0aWxvcyBhcGFnYWRvXG4gKiBxdWUgcHJvcG9yY2lvbmEgbWF0ZXJpYWwgY3VhbmRvIHVuIGVsZW1lbnRvL3RhZyBlc3RhIGRlcyBoYWJpbGl0YWRvLlxuICovXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2phbUF2b2lkRGlzYWJsZWRTdHlsZV0nXG59KVxuZXhwb3J0IGNsYXNzIEF2b2lkRGlzYWJsZWRTdHlsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBjaGFuZ2VzOiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBjb25zdCBOQVRJVkVfRUxFTUVOVCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuY2hhbmdlcyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnM6IEFycmF5PE11dGF0aW9uUmVjb3JkPik6IHZvaWQgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzZXJ2aW5nT3JpZ2luYWxTdHlsZXMobXV0YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZXMub2JzZXJ2ZShOQVRJVkVfRUxFTUVOVCwge1xuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVzZXJ2aW5nT3JpZ2luYWxTdHlsZXMobXV0YXRpb246IE11dGF0aW9uUmVjb3JkKTogdm9pZCB7XG4gICAgICAgIGlmIChtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lICE9PSAnYXJpYS1kaXNhYmxlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtZW50czogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUobXV0YXRpb24udGFyZ2V0Lm5vZGVOYW1lKTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9ICdpbmhlcml0JztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==