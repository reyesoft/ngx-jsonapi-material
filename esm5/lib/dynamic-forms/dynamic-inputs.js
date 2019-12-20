import * as tslib_1 from "tslib";
var DynamicInput = /** @class */ (function () {
    function DynamicInput(key) {
        this.key = this.id = this.name = key;
    }
    DynamicInput.prototype.setFocus = function () {
        this.focus = true;
        return this;
    };
    DynamicInput.prototype.required = function () {
        this.templateOptions.required = true;
        return this;
    };
    DynamicInput.prototype.fxFlex = function (value) {
        this.templateOptions.fxFlex = value;
        return this;
    };
    DynamicInput.prototype.set = function (property, value) {
        this[property] = value;
        return this;
    };
    DynamicInput.prototype.setTemplateOption = function (property, value) {
        this.templateOptions[property] = value;
        return this;
    };
    DynamicInput.prototype.addTemplateOptions = function (template_options) {
        this.templateOptions = tslib_1.__assign({}, this.templateOptions, template_options);
        return this;
    };
    DynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
        return this;
    };
    DynamicInput.prototype.load = function (fieldConfig) {
        for (var key in fieldConfig) {
            this[key] = fieldConfig[key];
        }
        return this;
    };
    return DynamicInput;
}());
export { DynamicInput };
var TextDynamicInput = /** @class */ (function (_super) {
    tslib_1.__extends(TextDynamicInput, _super);
    function TextDynamicInput(key) {
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.type = 'input';
        _this.templateOptions = {
            placeholder: key
        };
        return _this;
    }
    TextDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);
        return this;
    };
    return TextDynamicInput;
}(DynamicInput));
export { TextDynamicInput };
var NumberDynamicInput = /** @class */ (function (_super) {
    tslib_1.__extends(NumberDynamicInput, _super);
    function NumberDynamicInput(key) {
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.type = 'input';
        _this.key = _this.id = _this.name = key;
        _this.templateOptions = {
            type: 'number',
            step: 0.01,
            min: 0,
            placeholder: key
        };
        return _this;
    }
    NumberDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);
        return this;
    };
    return NumberDynamicInput;
}(DynamicInput));
export { NumberDynamicInput };
var CheckboxDynamicInput = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxDynamicInput, _super);
    function CheckboxDynamicInput(key) {
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.type = 'checkbox';
        _this.templateOptions = {
            indeterminate: false,
            label: key
        };
        return _this;
    }
    CheckboxDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
        this.templateOptions.label = translateService.instant(this.key);
        return this;
    };
    return CheckboxDynamicInput;
}(DynamicInput));
export { CheckboxDynamicInput };
var TextareaDynamicInput = /** @class */ (function (_super) {
    tslib_1.__extends(TextareaDynamicInput, _super);
    function TextareaDynamicInput(key) {
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.type = 'textarea';
        _this.templateOptions = {
            matAutosizeMinRows: 2,
            matAutosizeMaxRows: 150,
            label: key
        };
        return _this;
    }
    TextareaDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
        this.templateOptions.placeholder = translateService.instant(this.key);
        this.templateOptions.label = translateService.instant(this.key);
        return this;
    };
    return TextareaDynamicInput;
}(DynamicInput));
export { TextareaDynamicInput };
var SelectDynamicInput = /** @class */ (function (_super) {
    tslib_1.__extends(SelectDynamicInput, _super);
    function SelectDynamicInput(key) {
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.type = 'select';
        _this.templateOptions = {
            label: key,
            options: []
        };
        return _this;
    }
    SelectDynamicInput.prototype.setTranslatedTemplateOptions = function (translateService) {
        this.templateOptions.label = translateService.instant(this.key);
        return this;
    };
    SelectDynamicInput.prototype.setOptions = function (options) {
        this.templateOptions.options = options;
        return this;
    };
    return SelectDynamicInput;
}(DynamicInput));
export { SelectDynamicInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1pbnB1dHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9keW5hbWljLWZvcm1zL2R5bmFtaWMtaW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQTBDSSxzQkFBbUIsR0FBVztRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDekMsQ0FBQztJQUVNLCtCQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUVsQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sK0JBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sNkJBQU0sR0FBYixVQUFjLEtBQUs7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDBCQUFHLEdBQVYsVUFBVyxRQUFnQixFQUFFLEtBQVU7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUV2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sd0NBQWlCLEdBQXhCLFVBQXlCLFFBQWdCLEVBQUUsS0FBVTtRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUV2QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0seUNBQWtCLEdBQXpCLFVBQTBCLGdCQUF1QztRQUM3RCxJQUFJLENBQUMsZUFBZSx3QkFBUSxJQUFJLENBQUMsZUFBZSxFQUFLLGdCQUFnQixDQUFFLENBQUM7UUFFeEUsT0FBTyxJQUFJLENBQUM7SUFDaEIs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RztTQUNiLENBQUM7O0lBQ04sQ0FBQztJQUNNLDJEQUE0QixHQUFuQyxVQUFvQyxnQkFBa0M7UUFDbEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWhFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUFoQkQsQ0FBMEMsWUFBWSxHQWdCckQ7O0FBRUQ7SUFBd0MsOENBQVk7SUFDaEQsNEJBQTBCLEdBQUc7UUFBN0IsWUFDSSxrQkFBTSxHQUFHLENBQUMsU0FNYjtRQVB5QixTQUFHLEdBQUgsR0FBRyxDQUFBO1FBRXpCLEtBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxlQUFlLEdBQUc7WUFDbkIsS0FBSyxFQUFFLEdBQUc7WUFDVixPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7O0lBQ04sQ0FBQztJQUNNLHlEQUE0QixHQUFuQyxVQUFvQyxnQkFBa0M7UUFDbEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoRSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sdUNBQVUsR0FBakIsVUFBa0IsT0FBNkM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXZDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCx5QkFBQztBQUFELENBQUMsQUFwQkQsQ0FBd0MsWUFBWSxHQW9CbkQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAbWVyZ2VmbGFnIGxvcyBjYW1iaW9zIGVuIGVzdGUgY29tcG9uZW50ZSBubyBkZWJlbiBsbGVnYXIgYSAyMVxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seVRlbXBsYXRlT3B0aW9ucyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICduZ3gtanNvbmFwaSc7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljSW5wdXQgaW1wbGVtZW50cyBGb3JtbHlGaWVsZENvbmZpZyB7XG4gICAgcHVibGljIHJlYWRvbmx5IG1vZGVsOiBhbnk7XG4gICAgcHVibGljIHJlYWRvbmx5IHBhcmVudDogRm9ybWx5RmllbGRDb25maWc7XG5cbiAgICBwdWJsaWMga2V5OiBzdHJpbmc7XG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgdGVtcGxhdGVPcHRpb25zOiBGb3JtbHlUZW1wbGF0ZU9wdGlvbnM7XG4gICAgcHVibGljIG9wdGlvbnNUeXBlczogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgdmFsaWRhdGlvbjoge1xuICAgICAgICBtZXNzYWdlcz86IHtcbiAgICAgICAgICAgIFttZXNzYWdlUHJvcGVydGllczogc3RyaW5nXTogc3RyaW5nIHwgKChlcnJvcjogYW55LCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcpID0+IHN0cmluZyk7XG4gICAgICAgIH07XG4gICAgICAgIHNob3c/OiBib29sZWFuO1xuICAgICAgICBbYWRkaXRpb25hbFByb3BlcnRpZXM6IHN0cmluZ106IGFueTtcbiAgICB9O1xuICAgIHB1YmxpYyB2YWxpZGF0b3JzOiBhbnk7XG4gICAgcHVibGljIGFzeW5jVmFsaWRhdG9yczogYW55O1xuICAgIHB1YmxpYyB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgIHB1YmxpYyB3cmFwcGVyczogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgaGlkZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgaGlkZUV4cHJlc3Npb246IGJvb2xlYW4gfCBzdHJpbmcgfCAoKG1vZGVsOiBhbnksIGZvcm1TdGF0ZTogYW55KSA9PiBib29sZWFuKTtcbiAgICBwdWJsaWMgZXhwcmVzc2lvblByb3BlcnRpZXM6IHsgW3Byb3BlcnR5OiBzdHJpbmddOiBzdHJpbmcgfCAoKG1vZGVsOiBhbnksIGZvcm1TdGF0ZTogYW55KSA9PiBib29sZWFuKSB9IHwgYW55O1xuICAgIHB1YmxpYyBmb3JtQ29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuICAgIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZmllbGRHcm91cENsYXNzTmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBmaWVsZEdyb3VwOiBBcnJheTxGb3JtbHlGaWVsZENvbmZpZz47XG4gICAgcHVibGljIGZpZWxkQXJyYXk6IEZvcm1seUZpZWxkQ29uZmlnO1xuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIGNvbXBvbmVudDogYW55O1xuICAgIHB1YmxpYyBmb2N1czogYm9vbGVhbjtcbiAgICBwdWJsaWMgbW9kZWxPcHRpb25zOiB7XG4gICAgICAgIGRlYm91bmNlPzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVPbj86ICdjaGFuZ2UnIHwgJ2JsdXInIHwgJ3N1Ym1pdCc7XG4gICAgfTtcblxuICAgIC8vIHB1YmxpYyBsaWZlY3ljbGU/OiBGb3JtbHlMaWZlQ3ljbGVPcHRpb25zO1xuICAgIHB1YmxpYyBkZWZhdWx0VmFsdWU6IGFueTtcbiAgICBwdWJsaWMgcGFyc2VyczogQXJyYXk8KCh2YWx1ZTogYW55KSA9PiB7fSk+O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5pZCA9IHRoaXMubmFtZSA9IGtleTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Rm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXF1aXJlZCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBmeEZsZXgodmFsdWUpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMuZnhGbGV4ID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXNbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRlbXBsYXRlT3B0aW9uKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnNbcHJvcGVydHldID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFRlbXBsYXRlT3B0aW9ucyh0ZW1wbGF0ZV9vcHRpb25zOiBGb3JtbHlUZW1wbGF0ZU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7IC4uLnRoaXMudGVtcGxhdGVPcHRpb25zLCAuLi50ZW1wbGF0ZV9vcHRpb25zIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRyYW5zbGF0ZWRUZW1wbGF0ZU9wdGlvbnModHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZChmaWVsZENvbmZpZzogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGZpZWxkQ29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBmaWVsZENvbmZpZ1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGV4dER5bmFtaWNJbnB1dCBleHRlbmRzIER5bmFtaWNJbnB1dCBpbXBsZW1lbnRzIEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIGtleSkge1xuICAgICAgICBzdXBlcihrZXkpO1xuICAgICAgICB0aGlzLnR5cGUgPSAnaW5wdXQnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBrZXlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcHVibGljIHNldFRyYW5zbGF0ZWRUZW1wbGF0ZU9wdGlvbnModHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5wbGFjZWhvbGRlciA9IHRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCh0aGlzLmtleSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTnVtYmVyRHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdpbnB1dCc7XG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5pZCA9IHRoaXMubmFtZSA9IGtleTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHN0ZXA6IDAuMDEsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucGxhY2Vob2xkZXIgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENoZWNrYm94RHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmFsc2UsXG4gICAgICAgICAgICBsYWJlbDoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMubGFiZWwgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhRHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICd0ZXh0YXJlYSc7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgbWF0QXV0b3NpemVNaW5Sb3dzOiAyLFxuICAgICAgICAgICAgbWF0QXV0b3NpemVNYXhSb3dzOiAxNTAsXG4gICAgICAgICAgICBsYWJlbDoga2V5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUcmFuc2xhdGVkVGVtcGxhdGVPcHRpb25zKHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZU9wdGlvbnMucGxhY2Vob2xkZXIgPSB0cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodGhpcy5rZXkpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5sYWJlbCA9IHRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCh0aGlzLmtleSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0RHluYW1pY0lucHV0IGV4dGVuZHMgRHluYW1pY0lucHV0IGltcGxlbWVudHMgRm9ybWx5RmllbGRDb25maWcge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMga2V5KSB7XG4gICAgICAgIHN1cGVyKGtleSk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBrZXksXG4gICAgICAgICAgICBvcHRpb25zOiBbXVxuICAgICAgICB9O1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VHJhbnNsYXRlZFRlbXBsYXRlT3B0aW9ucyh0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVPcHRpb25zLmxhYmVsID0gdHJhbnNsYXRlU2VydmljZS5pbnN0YW50KHRoaXMua2V5KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0T3B0aW9ucyhvcHRpb25zOiBBcnJheTx7IHZhbHVlOiBhbnk7IGxhYmVsOiBzdHJpbmcgfT4pOiBTZWxlY3REeW5hbWljSW5wdXQge1xuICAgICAgICB0aGlzLnRlbXBsYXRlT3B0aW9ucy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iXX0=