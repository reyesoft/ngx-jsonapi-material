import { Button } from './button';
import { MenuElementsCollection, MenuElement } from './menu-elements';
export declare class Section extends MenuElementsCollection<MenuElement> {
    findButton: (arg: string) => Button;
    addButtons: (data: (MenuElement | MenuElementsCollection<MenuElement>)[]) => this;
    hasShownElements(): boolean;
}
