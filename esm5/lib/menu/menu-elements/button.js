import * as tslib_1 from "tslib";
import { MenuElement } from './menu-elements';
var Button = /** @class */ (function (_super) {
    tslib_1.__extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = {
            icon: '',
            label: '',
            class: '',
            disabled: false,
            hidden: false
        };
        return _this;
    }
    Button.prototype.setAttributes = function (attribute, // TODO: improve typing
    value) {
        this.attributes[attribute] = value;
        return this;
    };
    Button.prototype.addAttributes = function (attributes) {
        this.attributes = tslib_1.__assign({}, this.attributes, attributes);
        return this;
    };
    return Button;
}(MenuElement));
export { Button };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvbWVudS9tZW51LWVsZW1lbnRzL2J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTlDO0lBQTRCLGtDQUFXO0lBQXZDO1FBQUEscUVBdUJDO1FBdEJVLGdCQUFVLEdBQXlCO1lBQ3RDLElBQUksRUFBRSxFQUFFO1lBQ1IsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQzs7SUFnQk4sQ0FBQztJQWRVLDhCQUFhLEdBQXBCLFVBQ0ksU0FBd0YsRUFBRSx1QkFBdUI7SUFDakgsS0FBdUI7UUFFdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFbkMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDhCQUFhLEdBQXBCLFVBQXFCLFVBQWdDO1FBQ2pELElBQUksQ0FBQyxVQUFVLHdCQUFRLElBQUksQ0FBQyxVQUFVLEVBQUssVUFBVSxDQUFFLENBQUM7UUFFeEQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBdkJELENBQTRCLFdBQVcsR0F1QnRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVudUVsZW1lbnQgfSBmcm9tICcuL21lbnUtZWxlbWVudHMnO1xuXG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgTWVudUVsZW1lbnQge1xuICAgIHB1YmxpYyBhdHRyaWJ1dGVzOiBNZW51QnV0dG9uQXR0cmlidXRlcyA9IHtcbiAgICAgICAgaWNvbjogJycsXG4gICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgY2xhc3M6ICcnLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIGhpZGRlbjogZmFsc2VcbiAgICB9O1xuXG4gICAgcHVibGljIHNldEF0dHJpYnV0ZXMoXG4gICAgICAgIGF0dHJpYnV0ZTogJ2xhYmVsJyB8ICdpY29uJyB8ICdjbGFzcycgfCAnaGlkZGVuJyB8ICdkaXNhYmxlZCcgfCAnc3ZnX2ljb24nIHwgJ2ljb25fZm9udCcsIC8vIFRPRE86IGltcHJvdmUgdHlwaW5nXG4gICAgICAgIHZhbHVlOiBzdHJpbmcgfCBib29sZWFuXG4gICAgKTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZEF0dHJpYnV0ZXMoYXR0cmlidXRlczogTWVudUJ1dHRvbkF0dHJpYnV0ZXMpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0geyAuLi50aGlzLmF0dHJpYnV0ZXMsIC4uLmF0dHJpYnV0ZXMgfTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVudUJ1dHRvbkF0dHJpYnV0ZXMge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICBjbGFzcz86IHN0cmluZztcbiAgICBoaWRkZW4/OiBib29sZWFuO1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICBzdmdfaWNvbj86IHN0cmluZztcbiAgICBpY29uX2ZvbnQ/OiBzdHJpbmc7XG59XG4iXX0=