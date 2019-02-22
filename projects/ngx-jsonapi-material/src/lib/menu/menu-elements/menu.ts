import { Section } from './section';
import { Button } from './button';
import { MenuElementsCollection, MenuElement } from './menu-elements';

export class Menu extends MenuElementsCollection<Section> {
    public data: Array<Section> = <Array<Section>>[];
    public findSection: (arg: string) => Section = <(arg: string) => Section>this.find;
    public addSections = this.add;
    public removeEmptySections() {
        for (let section of this.data) {
            if (section.hasShownElements()) {
                return true;
            }
        }

        return false;
    }
}
