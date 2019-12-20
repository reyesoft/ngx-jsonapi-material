var FabSpeedDialMiniButton = /** @class */ (function () {
    function FabSpeedDialMiniButton(key, tooltip, router_link, query_params) {
        this.navigate = false;
        this.icon = { name: 'add', type: 'mat-icon' };
        this.key = key;
        this.tooltip = tooltip;
        if (router_link) {
            this.router_link = router_link;
            this.query_params = query_params || {};
        }
    }
    FabSpeedDialMiniButton.prototype.setRouterLink = function (router_link) {
        this.router_link = router_link;
        this.navigate = true;
        return this;
    };
    FabSpeedDialMiniButton.prototype.getRouterLink = function () {
        return this.router_link;
    };
    FabSpeedDialMiniButton.prototype.setQueryParams = function (query_params) {
        this.query_params = query_params;
        return this;
    };
    FabSpeedDialMiniButton.prototype.getQueryParams = function () {
        return this.query_params;
    };
    FabSpeedDialMiniButton.prototype.shouldNavigate = function () {
        return this.navigate;
    };
    return FabSpeedDialMiniButton;
}());
export { FabSpeedDialMiniButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFiLXNwZWVkLWRpYWwtbWluaS1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtanNvbmFwaS1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9mYWItc3BlZWQtZGlhbC9mYWItc3BlZWQtZGlhbC1taW5pLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVFJLGdDQUNJLEdBQVcsRUFDWCxPQUFlLEVBQ2YsV0FBMkIsRUFDM0IsWUFBbUM7UUFWaEMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUkxQixTQUFJLEdBQWtELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFRM0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxJQUFJLEVBQUUsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFFTSw4Q0FBYSxHQUFwQixVQUFxQixXQUEwQjtRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sOENBQWEsR0FBcEI7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVNLCtDQUFjLEdBQXJCLFVBQXNCLFlBQWtDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBRWpDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSwrQ0FBYyxHQUFyQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRU0sK0NBQWMsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVMLDZCQUFDO0FBQUQsQ0FBQyxBQS9DRCxJQStDQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBGYWJTcGVlZERpYWxNaW5pQnV0dG9uIHtcbiAgICBwdWJsaWMga2V5OiBzdHJpbmc7XG4gICAgcHVibGljIG5hdmlnYXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHRvb2x0aXA6IHN0cmluZztcbiAgICBwdWJsaWMgcm91dGVyX2xpbms6IEFycmF5PHN0cmluZz47XG4gICAgcHVibGljIHF1ZXJ5X3BhcmFtczoge1trZXk6IHN0cmluZ106IGFueX07XG4gICAgcHVibGljIGljb246IHsgbmFtZTogc3RyaW5nOyB0eXBlOiAnc3ZnLWljb24nfCdtYXQtaWNvbicgfSA9IHsgbmFtZTogJ2FkZCcsIHR5cGU6ICdtYXQtaWNvbicgfTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAga2V5OiBzdHJpbmcsXG4gICAgICAgIHRvb2x0aXA6IHN0cmluZyxcbiAgICAgICAgcm91dGVyX2xpbms/OiBBcnJheTxzdHJpbmc+LFxuICAgICAgICBxdWVyeV9wYXJhbXM/OiB7W2tleTogc3RyaW5nXTogYW55fVxuICAgICkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy50b29sdGlwID0gdG9vbHRpcDtcbiAgICAgICAgaWYgKHJvdXRlcl9saW5rKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlcl9saW5rID0gcm91dGVyX2xpbms7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5X3BhcmFtcyA9IHF1ZXJ5X3BhcmFtcyB8fCB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRSb3V0ZXJMaW5rKHJvdXRlcl9saW5rOiBBcnJheTxzdHJpbmc+KTogdGhpcyB7XG4gICAgICAgIHRoaXMucm91dGVyX2xpbmsgPSByb3V0ZXJfbGluaztcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJvdXRlckxpbmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlcl9saW5rO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRRdWVyeVBhcmFtcyhxdWVyeV9wYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdGhpcyB7XG4gICAgICAgIHRoaXMucXVlcnlfcGFyYW1zID0gcXVlcnlfcGFyYW1zO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRRdWVyeVBhcmFtcygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5X3BhcmFtcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdWxkTmF2aWdhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlO1xuICAgIH1cblxufVxuIl19