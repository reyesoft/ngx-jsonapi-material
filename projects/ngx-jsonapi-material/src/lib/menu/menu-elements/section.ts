import { Button } from './button';
import { MenuElementsCollection, MenuElement } from './menu-elements';

export class Section extends MenuElementsCollection<MenuElement> {
    public findButton: (arg: string) => Button = <(arg: string) => Button>this.find;
    public addButtons = this.add;

    public hasShownElements() {
        for (let element of this.data) {
            if (element.isShown()) {
                return true;
            }
        }

        return false;
    }
}
