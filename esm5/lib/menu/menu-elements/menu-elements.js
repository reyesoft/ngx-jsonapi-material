import * as tslib_1 from "tslib";
var MenuElement = /** @class */ (function () {
    function MenuElement(id) {
        this.attributes = {};
        this._id = id;
    }
    Object.defineProperty(MenuElement.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    MenuElement.prototype.setAttributes = function (attribute, value) {
        this.attributes[attribute] = value;
        return this;
    };
    MenuElement.prototype.addAttributes = function (attributes) {
        this.attributes = tslib_1.__assign({}, this.attributes, attributes);
        return this;
    };
    MenuElement.prototype.hide = function () {
        this.attributes.hidden = true;
        return this;
    };
    MenuElement.prototype.show = function () {
        this.attributes.hidden = false;
        return this;
    };
    MenuElement.prototype.isShown = function () {
        return !this.attributes.hidden;
    };
    MenuElement.prototype.disable = function () {
        this.attributes.disabled = true;
        return this;
    };
    MenuElement.prototype.enable = function () {
        this.attributes.disabled = false;
        return this;
    };
    return MenuElement;
}());
export { MenuElement };
var MenuElementsCollection = /** @class */ (function () {
    function MenuElementsCollection(id) {
        this.data = [];
        this._id = id;
    }
    Object.defineProperty(MenuElementsCollection.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    MenuElementsCollection.prototype.hide = function () {
        this.hidden = true;
        return this;
    };
    MenuElementsCollection.prototype.show = function () {
        this.hidden = false;
        return this;
    };
    MenuElementsCollection.prototype.isShown = function () {
        return !this.hidden;
    };
    MenuElementsCollection.prototype.find = function (id) {
        var _this = this;
        return this.data.find(function (element) {
            if (_this.data.length === 0) {
                console.log('--------------- no data! ---------------');
                return false;
            }
            return element.id === id;
        });
    };
    MenuElementsCollection.prototype.add = function (data) {
        this.data = this.data.concat(data);
        return this;
    };
    return MenuElementsCollection;
}());
export { MenuElementsCollection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1lbGVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL21lbnUvbWVudS1lbGVtZW50cy9tZW51LWVsZW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQU1JLHFCQUFtQixFQUFXO1FBTHZCLGVBQVUsR0FBeUIsRUFBRSxDQUFDO1FBTXpDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFKRCxzQkFBVywyQkFBRTthQUFiLGNBQTBCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBTXJDLG1DQUFhLEdBQXBCLFVBQXFCLFNBQWlCLEVBQUUsS0FBVTtRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUVuQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sbUNBQWEsR0FBcEIsVUFBcUIsVUFBZ0M7UUFDakQsSUFBSSxDQUFDLFVBQVUsd0JBQVEsSUFBSSxDQUFDLFVBQVUsRUFBSyxVQUFVLENBQUUsQ0FBQztRQUV4RCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sMEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUU5QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sMEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUUvQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sNkJBQU8sR0FBZDtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBRU0sNkJBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVoQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sNEJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBakRELElBaURDOztBQUVEO0lBT0ksZ0NBQW1CLEVBQVc7UUFOdkIsU0FBSSxHQUF5QyxFQUFFLENBQUM7UUFPbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUpELHNCQUFXLHNDQUFFO2FBQWIsY0FBMEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFNckMscUNBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxxQ0FBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHdDQUFPLEdBQWQ7UUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRU0scUNBQUksR0FBWCxVQUFZLEVBQVU7UUFBdEIsaUJBVUM7UUFURyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUN6QixJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2dCQUV4RCxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE9BQU8sT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sb0NBQUcsR0FBVixVQUFXLElBQTBDO1FBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNZW51RWxlbWVudCB7XG4gICAgcHVibGljIGF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICBwcm90ZWN0ZWQgX2lkOiBzdHJpbmc7XG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihpZD86IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlc1thdHRyaWJ1dGVdID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZEF0dHJpYnV0ZXMoYXR0cmlidXRlczoge1trZXk6IHN0cmluZ106IGFueX0pOiB0aGlzIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0geyAuLi50aGlzLmF0dHJpYnV0ZXMsIC4uLmF0dHJpYnV0ZXMgfTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZSgpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLmhpZGRlbiA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3coKTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNTaG93bigpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmF0dHJpYnV0ZXMuaGlkZGVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlKCk6IHRoaXMge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGUoKTogdGhpcyB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1lbnVFbGVtZW50c0NvbGxlY3Rpb24gPFQgZXh0ZW5kcyBNZW51RWxlbWVudCB8IE1lbnVFbGVtZW50c0NvbGxlY3Rpb248TWVudUVsZW1lbnQ+PiB7XG4gICAgcHVibGljIGRhdGE6IEFycmF5PE1lbnVFbGVtZW50c0NvbGxlY3Rpb248VD4gfCBUPiA9IFtdO1xuICAgIHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XG5cbiAgICBwcm90ZWN0ZWQgX2lkOiBzdHJpbmc7XG4gICAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihpZD86IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlKCk6IHRoaXMge1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3coKTogdGhpcyB7XG4gICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGlzU2hvd24oKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5oaWRkZW47XG4gICAgfVxuXG4gICAgcHVibGljIGZpbmQoaWQ6IHN0cmluZyk6IE1lbnVFbGVtZW50c0NvbGxlY3Rpb248VD4gfCBUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5maW5kKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tIG5vIGRhdGEhIC0tLS0tLS0tLS0tLS0tLScpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5pZCA9PT0gaWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGQoZGF0YTogQXJyYXk8TWVudUVsZW1lbnRzQ29sbGVjdGlvbjxUPiB8IFQ+KTogdGhpcyB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jb25jYXQoZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIl19