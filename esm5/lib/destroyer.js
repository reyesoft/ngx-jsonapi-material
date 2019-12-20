import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
var Destroyer = /** @class */ (function () {
    function Destroyer() {
        this.takeuntil = new Subject();
    }
    Destroyer.prototype.pipe = function () {
        return pipe(takeUntil(this.takeuntil));
    };
    Destroyer.prototype.destroy = function () {
        this.takeuntil.next();
        this.takeuntil.complete();
    };
    return Destroyer;
}());
export { Destroyer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzdHJveWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWpzb25hcGktbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZGVzdHJveWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQWdDLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0M7SUFBQTtRQUNZLGNBQVMsR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQVVyRCxDQUFDO0lBUlUsd0JBQUksR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sMkJBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgLCBVbmFyeUZ1bmN0aW9uICwgT2JzZXJ2YWJsZSAsIHBpcGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIERlc3Ryb3llciB7XG4gICAgcHJpdmF0ZSB0YWtldW50aWw6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgcHVibGljIHBpcGUoKTogVW5hcnlGdW5jdGlvbjxPYnNlcnZhYmxlPGFueT4sIE9ic2VydmFibGU8YW55Pj4ge1xuICAgICAgICByZXR1cm4gcGlwZSh0YWtlVW50aWwodGhpcy50YWtldW50aWwpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWtldW50aWwubmV4dCgpO1xuICAgICAgICB0aGlzLnRha2V1bnRpbC5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbiJdfQ==