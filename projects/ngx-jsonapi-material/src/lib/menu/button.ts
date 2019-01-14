export class Button {
    public id = 'string';
    public attributes: Attributes = {
        icon: '',
        label: '',
        class: '',
        disabled: false,
        hidden: false
    }

    public constructor(id: string) {
        this.id = id;
    }

    public setButtonAttributes(attribute: string, value: string): this {
        this.attributes[attribute] = value;

        return this;
    }

    public addButtonAttributes(attributes: Attributes) {
        this.attributes = { ...this.attributes, ...attributes };

        return this;
    }
}

export interface Attributes {
    label: string;
    icon?: string;
    class?: string;
    hidden?: boolean;
    disabled?: boolean;
    custom_icon_svg?: string;
    custom_icon_font?: string;
}

export interface Option {
    section?: string;
    hidden?: boolean;
    buttons: Array<Button>;
}
