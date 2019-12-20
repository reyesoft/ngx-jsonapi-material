import * as tslib_1 from "tslib";
import { MenuElementsCollection } from './menu-elements';
var Section = /** @class */ (function (_super) {
    tslib_1.__extends(Section, _super);
    function Section() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.findButton = _this.find;
        _this.addButtons = _this.add;
        return _this;
    }
    Section.prototype.hasShownElements = function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                var element = _c.value;
                if (element.isShown()) {
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
    return Section;
}(MenuElementsCollection));
export { Section };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL21lbnUvbWVudS1lbGVtZW50cy9zZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsc0JBQXNCLEVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RTtJQUE2QixtQ0FBbUM7SUFBaEU7UUFBQSxxRUFhQztRQVpVLGdCQUFVLEdBQXFELEtBQUksQ0FBQyxJQUFJLENBQUM7UUFDekUsZ0JBQVUsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDOztJQVdqQyxDQUFDO0lBVFUsa0NBQWdCLEdBQXZCOzs7WUFDSSxLQUFvQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQSxnQkFBQSw0QkFBRTtnQkFBMUIsSUFBSSxPQUFPLFdBQUE7Z0JBQ1osSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ25CLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7Ozs7Ozs7OztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQWJELENBQTZCLHNCQUFzQixHQWFsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vYnV0dG9uJztcbmltcG9ydCB7IE1lbnVFbGVtZW50c0NvbGxlY3Rpb24sIE1lbnVFbGVtZW50IH0gZnJvbSAnLi9tZW51LWVsZW1lbnRzJztcblxuZXhwb3J0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBNZW51RWxlbWVudHNDb2xsZWN0aW9uPE1lbnVFbGVtZW50PiB7XG4gICAgcHVibGljIGZpbmRCdXR0b246IChhcmc6IHN0cmluZykgPT4gQnV0dG9uID0gPChhcmc6IHN0cmluZykgPT4gQnV0dG9uPnRoaXMuZmluZDtcbiAgICBwdWJsaWMgYWRkQnV0dG9ucyA9IHRoaXMuYWRkO1xuXG4gICAgcHVibGljIGhhc1Nob3duRWxlbWVudHMoKSB7XG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdGhpcy5kYXRhKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXX0=