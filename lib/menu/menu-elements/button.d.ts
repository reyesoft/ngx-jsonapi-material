import { MenuElement } from './menu-elements';
export declare class Button extends MenuElement {
    attributes: MenuButtonAttributes;
    setAttributes(attribute: 'label' | 'icon' | 'class' | 'hidden' | 'disabled' | 'svg_icon' | 'icon_font', // TODO: improve typing
    value: string | boolean): this;
    addAttributes(attributes: MenuButtonAttributes): this;
}
export interface MenuButtonAttributes {
    label: string;
    icon?: string;
    class?: string;
    hidden?: boolean;
    disabled?: boolean;
    svg_icon?: string;
    icon_font?: string;
}
