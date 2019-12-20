import * as tslib_1 from "tslib";
import { FilterConfig } from './filter.interface';
var JsonapiFilterRangedateConfig = /** @class */ (function (_super) {
    tslib_1.__extends(JsonapiFilterRangedateConfig, _super);
    function JsonapiFilterRangedateConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attribute = 'date';
        _this.options = {};
        _this.selected = { since: '', until: '' };
        return _this;
    }
    JsonapiFilterRangedateConfig.prototype.setProperty = function (property_name, property_value) {
        this[property_name] = property_value;
        return this;
    };
    return JsonapiFilterRangedateConfig;
}(FilterConfig));
export { JsonapiFilterRangedateConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWRhdGUtcmFuZ2UuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmlsdGVycy9pbnRlcmZhY2VzL2ZpbHRlci1kYXRlLXJhbmdlLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFVLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUTFEO0lBQWtELHdEQUFZO0lBQTlEO1FBQUEscUVBV0M7UUFUVSxlQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLGFBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixjQUFRLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQzs7SUFPL0MsQ0FBQztJQUxVLGtEQUFXLEdBQWxCLFVBQW1CLGFBQWEsRUFBRSxjQUFjO1FBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxjQUFjLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLG1DQUFDO0FBQUQsQ0FBQyxBQVhELENBQWtELFlBQVksR0FXN0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWx0ZXIsIEZpbHRlckNvbmZpZyB9IGZyb20gJy4vZmlsdGVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ZpbHRlci10eXBlcy9kYXRlLXJhbmdlLWZpbHRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckRhdGVSYW5nZSBleHRlbmRzIEZpbHRlciB7XG4gICAgdHlwZTogJ3JhbmdlX2RhdGUnO1xuICAgIHNlbGVjdGVkOiBEYXRlUmFuZ2VGaWx0ZXJJbnRlcmZhY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBKc29uYXBpRmlsdGVyUmFuZ2VkYXRlQ29uZmlnIGV4dGVuZHMgRmlsdGVyQ29uZmlnIGltcGxlbWVudHMgRmlsdGVyRGF0ZVJhbmdlIHtcbiAgICBwdWJsaWMgdHlwZTogJ3JhbmdlX2RhdGUnO1xuICAgIHB1YmxpYyBhdHRyaWJ1dGUgPSAnZGF0ZSc7XG4gICAgcHVibGljIG9wdGlvbnMgPSB7fTtcbiAgICBwdWJsaWMgc2VsZWN0ZWQgPSB7IHNpbmNlOiAnJywgdW50aWw6ICcnIH07XG5cbiAgICBwdWJsaWMgc2V0UHJvcGVydHkocHJvcGVydHlfbmFtZSwgcHJvcGVydHlfdmFsdWUpIHtcbiAgICAgICAgdGhpc1twcm9wZXJ0eV9uYW1lXSA9IHByb3BlcnR5X3ZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiJdfQ==