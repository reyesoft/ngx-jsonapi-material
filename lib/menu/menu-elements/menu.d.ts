import { Section } from './section';
import { MenuElementsCollection } from './menu-elements';
export declare class Menu extends MenuElementsCollection<Section> {
    data: Array<Section>;
    main_image: {
        url: string;
        styles?: {
            [key: string]: string;
        };
    };
    findSection: (arg: string) => Section;
    addSections: (data: (Section | MenuElementsCollection<Section>)[]) => this;
    removeEmptySections(): boolean;
    setMainImage(image_data: {
        url: string;
        styles?: {
            [key: string]: string;
        };
    }): Menu;
}
