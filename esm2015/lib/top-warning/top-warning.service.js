/***
 * Copyright (C) 1997-2018 Reyesoft <info@reyesoft.com>
 *
 * This file is part of Multinexo. Multinexo can not be copied and/or
 * distributed without the express permission of Reyesoft
 */
import { Injectable } from '@angular/core';
export class TopWarningService {
    constructor() {
        this.warnings = [];
    }
    /**
     * Receives a warning resource.
     *
     * @param warning
     */
    setWarningMessage(warning) {
        if (!warning)
            return;
        if (this.warnings.length <= 0) {
            this.warnings.push(warning);
        }
        let search_warning = this.warnings.find(msj_warning => msj_warning.id === warning.id);
        if (!search_warning || search_warning.id !== warning.id) {
            this.warnings.push(warning);
        }
    }
    getWarningMessage() {
        return this.warnings;
    }
    clearMessage(warning_keys) {
        for (let warning of this.warnings) {
            if (!warning_keys.includes(warning.id))
                continue;
            let index = this.warnings.indexOf(warning);
            this.warnings.splice(index, 1);
        }
    }
}
TopWarningService.decorators = [
    { type: Injectable },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLXdhcm5pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3RvcC13YXJuaW5nL3RvcC13YXJuaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBb0IzQyxNQUFNLE9BQU8saUJBQWlCO0lBRDlCO1FBRVcsYUFBUSxHQUFvQixFQUFFLENBQUM7SUErQjFDLENBQUM7SUE3Qkc7Ozs7T0FJRztJQUNJLGlCQUFpQixDQUFDLE9BQWlCO1FBQ3RDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUVyQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLGNBQWMsSUFBSSxjQUFjLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRU0saUJBQWlCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sWUFBWSxDQUFDLFlBQTJCO1FBQzNDLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUFFLFNBQVM7WUFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQzs7O1lBaENKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqXG4gKiBDb3B5cmlnaHQgKEMpIDE5OTctMjAxOCBSZXllc29mdCA8aW5mb0ByZXllc29mdC5jb20+XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgTXVsdGluZXhvLiBNdWx0aW5leG8gY2FuIG5vdCBiZSBjb3BpZWQgYW5kL29yXG4gKiBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSBleHByZXNzIHBlcm1pc3Npb24gb2YgUmV5ZXNvZnRcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQHBhcmFtIGlkOiBUaGUgaWQgbXVzdCBiZSBjb21wb3NlZCBvZiB0aGUgcmVzb3VyY2UgZm9sbG93ZWQgYnkgYSBwZXJpb2QgYW5kIGEgc2hvcnQsXG4gKiBkZXNjcmlwdGl2ZSBtZXNzYWdlIG9mIHRoZSB3YXJuaW5nIGluIHF1ZXN0aW9uLlxuICogQHBhcmFtIG1lc3NhZ2U6IEl0IG11c3QgYmUgYSBkZXNjcmlwdGl2ZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcGFyYW0gbGluazogSXQgaXMgb3B0aW9uYWwsIGFuZCBtdXN0IGNvbnRhaW4gYSByb3V0ZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJV2FybmluZyB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgbGluaz86IHN0cmluZztcbiAgICAgICAgbGlua1F1ZXJ5UGFyYW1zPzoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gICAgICAgIGV4dGVybmFsTGluaz86IHN0cmluZztcbiAgICAgICAgbGlua1RleHQ/OiBzdHJpbmc7XG4gICAgfTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRvcFdhcm5pbmdTZXJ2aWNlIHtcbiAgICBwdWJsaWMgd2FybmluZ3M6IEFycmF5PElXYXJuaW5nPiA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogUmVjZWl2ZXMgYSB3YXJuaW5nIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdhcm5pbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0V2FybmluZ01lc3NhZ2Uod2FybmluZzogSVdhcm5pbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF3YXJuaW5nKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMud2FybmluZ3MubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaCh3YXJuaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWFyY2hfd2FybmluZyA9IHRoaXMud2FybmluZ3MuZmluZChtc2pfd2FybmluZyA9PiBtc2pfd2FybmluZy5pZCA9PT0gd2FybmluZy5pZCk7XG4gICAgICAgIGlmICghc2VhcmNoX3dhcm5pbmcgfHwgc2VhcmNoX3dhcm5pbmcuaWQgIT09IHdhcm5pbmcuaWQpIHtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3MucHVzaCh3YXJuaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYXJuaW5nTWVzc2FnZSgpOiBBcnJheTxJV2FybmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy53YXJuaW5ncztcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJNZXNzYWdlKHdhcm5pbmdfa2V5czogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCB3YXJuaW5nIG9mIHRoaXMud2FybmluZ3MpIHtcbiAgICAgICAgICAgIGlmICghd2FybmluZ19rZXlzLmluY2x1ZGVzKHdhcm5pbmcuaWQpKSBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMud2FybmluZ3MuaW5kZXhPZih3YXJuaW5nKTtcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==