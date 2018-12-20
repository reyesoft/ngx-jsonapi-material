export class Button {
    public id = 'string';
    public attributes = {
        icon: '',
        label: '',
        class: ''
    }

    public constructor(id: string) {
        this.id = id;
    }

    public setButtonAttributes(attribute: string, value: string): this {
        this.attributes[attribute] = value;

        return this;
    }

    public addButtonAttributes(attributes: any) {
        this.attributes = { ...this.attributes, ...attributes };

        return this;
    }
}

export interface Option {
    section?: string;
    buttons: Array<Button>;
}
