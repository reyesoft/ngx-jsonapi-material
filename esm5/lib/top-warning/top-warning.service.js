/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var TopWarningService = /** @class */ (function () {
    function TopWarningService() {
        this.warnings = [];
    }
    /**
     * Receives a warning resource.
     *
     * @param warning
     */
    TopWarningService.prototype.setWarningMessage = function (warning) {
        if (!warning)
            return;
        if (this.warnings.length <= 0) {
            this.warnings.push(warning);
        }
        var search_warning = this.warnings.find(function (msj_warning) { return msj_warning.id === warning.id; });
        if (!search_warning || search_warning.id !== warning.id) {
            this.warnings.push(warning);
        }
    };
    TopWarningService.prototype.getWarningMessage = function () {
        return this.warnings;
    };
    TopWarningService.prototype.clearMessage = function (warning_keys) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.warnings), _c = _b.next(); !_c.done; _c = _b.next()) {
                var warning = _c.value;
                if (!warning_keys.includes(warning.id))
                    continue;
                var index = this.warnings.indexOf(warning);
                this.warnings.splice(index, 1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TopWarningService.decorators = [
        { type: Injectable },
    ];
    return TopWarningService;
}());
export { TopWarningService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLXdhcm5pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3RvcC13YXJuaW5nL3RvcC13YXJuaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW1CM0M7SUFBQTtRQUVXLGFBQVEsR0FBb0IsRUFBRSxDQUFDO0lBK0IxQyxDQUFDO0lBN0JHOzs7O09BSUc7SUFDSSw2Q0FBaUIsR0FBeEIsVUFBeUIsT0FBaUI7UUFDdEMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRXJCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxXQUFXLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFTSw2Q0FBaUIsR0FBeEI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLHdDQUFZLEdBQW5CLFVBQW9CLFlBQTJCOzs7WUFDM0MsS0FBb0IsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxRQUFRLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTlCLElBQUksT0FBTyxXQUFBO2dCQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQUUsU0FBUztnQkFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNsQzs7Ozs7Ozs7O0lBQ0wsQ0FBQzs7Z0JBaENKLFVBQVU7O0lBaUNYLHdCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FoQ1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKlxuICogQ29weXJpZ2h0IChDKSAxOTk3LTIwMTggUmV5ZXNvZnQgPGluZm9AcmV5ZXNvZnQuY29tPlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE11bHRpbmV4by4gTXVsdGluZXhvIGNhbiBub3QgYmUgY29waWVkIGFuZC9vclxuICogZGlzdHJpYnV0ZWQgd2l0aG91dCB0aGUgZXhwcmVzcyBwZXJtaXNzaW9uIG9mIFJleWVzb2Z0XG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEBwYXJhbSBpZDogVGhlIGlkIG11c3QgYmUgY29tcG9zZWQgb2YgdGhlIHJlc291cmNlIGZvbGxvd2VkIGJ5IGEgcGVyaW9kIGFuZCBhIHNob3J0LFxuICogZGVzY3JpcHRpdmUgbWVzc2FnZSBvZiB0aGUgd2FybmluZyBpbiBxdWVzdGlvbi5cbiAqIEBwYXJhbSBtZXNzYWdlOiBJdCBtdXN0IGJlIGEgZGVzY3JpcHRpdmUgd2FybmluZyBtZXNzYWdlLlxuICogQHBhcmFtIGxpbms6IEl0IGlzIG9wdGlvbmFsLCBhbmQgbXVzdCBjb250YWluIGEgcm91dGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVdhcm5pbmcge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIGxpbms/OiBzdHJpbmc7XG4gICAgICAgIGxpbmtRdWVyeVBhcmFtcz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICAgICAgICBleHRlcm5hbExpbms/OiBzdHJpbmc7XG4gICAgICAgIGxpbmtUZXh0Pzogc3RyaW5nO1xuICAgIH07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb3BXYXJuaW5nU2VydmljZSB7XG4gICAgcHVibGljIHdhcm5pbmdzOiBBcnJheTxJV2FybmluZz4gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFJlY2VpdmVzIGEgd2FybmluZyByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3YXJuaW5nXG4gICAgICovXG4gICAgcHVibGljIHNldFdhcm5pbmdNZXNzYWdlKHdhcm5pbmc6IElXYXJuaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICghd2FybmluZykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLndhcm5pbmdzLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2god2FybmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VhcmNoX3dhcm5pbmcgPSB0aGlzLndhcm5pbmdzLmZpbmQobXNqX3dhcm5pbmcgPT4gbXNqX3dhcm5pbmcuaWQgPT09IHdhcm5pbmcuaWQpO1xuICAgICAgICBpZiAoIXNlYXJjaF93YXJuaW5nIHx8IHNlYXJjaF93YXJuaW5nLmlkICE9PSB3YXJuaW5nLmlkKSB7XG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnB1c2god2FybmluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0V2FybmluZ01lc3NhZ2UoKTogQXJyYXk8SVdhcm5pbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FybmluZ3M7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyTWVzc2FnZSh3YXJuaW5nX2tleXM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgd2FybmluZyBvZiB0aGlzLndhcm5pbmdzKSB7XG4gICAgICAgICAgICBpZiAoIXdhcm5pbmdfa2V5cy5pbmNsdWRlcyh3YXJuaW5nLmlkKSkgY29udGludWU7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLndhcm5pbmdzLmluZGV4T2Yod2FybmluZyk7XG4gICAgICAgICAgICB0aGlzLndhcm5pbmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=