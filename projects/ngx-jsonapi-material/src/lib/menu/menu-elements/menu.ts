import { Section } from './section';
import { Button } from './button';
import { MenuElementsCollection, MenuElement } from './menu-elements';

export class Menu extends MenuElementsCollection<Section> {
    public data: Array<Section> = <Array<Section>>[];
    public main_image: {url: string; styles?: {[key: string]: string}};
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
    public setMainImage(image_data: {url: string; styles?: {[key: string]: string}}): Menu {
        this.main_image = image_data;

        return this;
    }
}
