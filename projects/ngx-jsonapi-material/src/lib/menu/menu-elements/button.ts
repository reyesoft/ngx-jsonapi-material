import { MenuElement } from './menu-elements';

export class Button extends MenuElement {
    public attributes: MenuButtonAttributes = {
        icon: '',
        label: '',
        class: '',
        disabled: false,
        hidden: false
    };

    public setAttributes(
        attribute: 'label' | 'icon' | 'class' | 'hidden' | 'disabled' | 'svg_icon' | 'icon_font', // TODO: improve typing
        value: string | boolean
    ): this {
        this.attributes[attribute] = value;

        return this;
    }

    public addAttributes(attributes: MenuButtonAttributes): this {
        this.attributes = { ...this.attributes, ...attributes };

        return this;
    }
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
