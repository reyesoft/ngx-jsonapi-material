import { MenuElementsCollection } from './menu-elements';
export class Section extends MenuElementsCollection {
    constructor() {
        super(...arguments);
        this.findButton = this.find;
        this.addButtons = this.add;
    }
    hasShownElements() {
        for (let element of this.data) {
            if (element.isShown()) {
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uYXBpLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL21lbnUvbWVudS1lbGVtZW50cy9zZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxzQkFBc0IsRUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBRXRFLE1BQU0sT0FBTyxPQUFRLFNBQVEsc0JBQW1DO0lBQWhFOztRQUNXLGVBQVUsR0FBcUQsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN6RSxlQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQVdqQyxDQUFDO0lBVFUsZ0JBQWdCO1FBQ25CLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUMzQixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbkIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHsgTWVudUVsZW1lbnRzQ29sbGVjdGlvbiwgTWVudUVsZW1lbnQgfSBmcm9tICcuL21lbnUtZWxlbWVudHMnO1xuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIE1lbnVFbGVtZW50c0NvbGxlY3Rpb248TWVudUVsZW1lbnQ+IHtcbiAgICBwdWJsaWMgZmluZEJ1dHRvbjogKGFyZzogc3RyaW5nKSA9PiBCdXR0b24gPSA8KGFyZzogc3RyaW5nKSA9PiBCdXR0b24+dGhpcy5maW5kO1xuICAgIHB1YmxpYyBhZGRCdXR0b25zID0gdGhpcy5hZGQ7XG5cbiAgICBwdWJsaWMgaGFzU2hvd25FbGVtZW50cygpIHtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlzU2hvd24oKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==