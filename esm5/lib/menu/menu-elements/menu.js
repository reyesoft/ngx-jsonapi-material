import * as tslib_1 from "tslib";
import { MenuElementsCollection } from './menu-elements';
var Menu = /** @class */ (function (_super) {
    tslib_1.__extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [];
        _this.findSection = _this.find;
        _this.addSections = _this.add;
        return _this;
    }
    Menu.prototype.removeEmptySections = function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                var section = _c.value;
                if (section.hasShownElements()) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    Menu.prototype.setMainImage = function (image_data) {
        this.main_image = image_data;
        return this;
    };
    return Menu;
}(MenuElementsCollection));
export { Menu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL21lbnUvbWVudS1lbGVtZW50cy9tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsc0JBQXNCLEVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RTtJQUEwQixnQ0FBK0I7SUFBekQ7UUFBQSxxRUFtQkM7UUFsQlUsVUFBSSxHQUFtQyxFQUFFLENBQUM7UUFFMUMsaUJBQVcsR0FBdUQsS0FBSSxDQUFDLElBQUksQ0FBQztRQUM1RSxpQkFBVyxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUM7O0lBZWxDLENBQUM7SUFkVSxrQ0FBbUIsR0FBMUI7OztZQUNJLEtBQW9CLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFBLGdCQUFBLDRCQUFFO2dCQUExQixJQUFJLE9BQU8sV0FBQTtnQkFDWixJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO29CQUM1QixPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKOzs7Ozs7Ozs7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ00sMkJBQVksR0FBbkIsVUFBb0IsVUFBMkQ7UUFDM0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFFN0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBbkJELENBQTBCLHNCQUFzQixHQW1CL0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWN0aW9uIH0gZnJvbSAnLi9zZWN0aW9uJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vYnV0dG9uJztcbmltcG9ydCB7IE1lbnVFbGVtZW50c0NvbGxlY3Rpb24sIE1lbnVFbGVtZW50IH0gZnJvbSAnLi9tZW51LWVsZW1lbnRzJztcblxuZXhwb3J0IGNsYXNzIE1lbnUgZXh0ZW5kcyBNZW51RWxlbWVudHNDb2xsZWN0aW9uPFNlY3Rpb24+IHtcbiAgICBwdWJsaWMgZGF0YTogQXJyYXk8U2VjdGlvbj4gPSA8QXJyYXk8U2VjdGlvbj4+W107XG4gICAgcHVibGljIG1haW5faW1hZ2U6IHt1cmw6IHN0cmluZzsgc3R5bGVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ319O1xuICAgIHB1YmxpYyBmaW5kU2VjdGlvbjogKGFyZzogc3RyaW5nKSA9PiBTZWN0aW9uID0gPChhcmc6IHN0cmluZykgPT4gU2VjdGlvbj50aGlzLmZpbmQ7XG4gICAgcHVibGljIGFkZFNlY3Rpb25zID0gdGhpcy5hZGQ7XG4gICAgcHVibGljIHJlbW92ZUVtcHR5U2VjdGlvbnMoKSB7XG4gICAgICAgIGZvciAobGV0IHNlY3Rpb24gb2YgdGhpcy5kYXRhKSB7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5oYXNTaG93bkVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcHVibGljIHNldE1haW5JbWFnZShpbWFnZV9kYXRhOiB7dXJsOiBzdHJpbmc7IHN0eWxlcz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9fSk6IE1lbnUge1xuICAgICAgICB0aGlzLm1haW5faW1hZ2UgPSBpbWFnZV9kYXRhO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiJdfQ==