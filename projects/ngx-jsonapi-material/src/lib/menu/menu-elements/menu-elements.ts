export class MenuElement {
    public attributes: {[key: string]: any} = {};

    protected _id: string;
    public get id(): string { return this._id; }

    public constructor(id?: string) {
        this._id = id;
    }

    public setAttributes(attribute: string, value: any): this {
        this.attributes[attribute] = value;

        return this;
    }

    public addAttributes(attributes: {[key: string]: any}): this {
        this.attributes = { ...this.attributes, ...attributes };

        return this;
    }

    public hide(): this {
        this.attributes.hidden = true;

        return this;
    }

    public show(): this {
        this.attributes.hidden = false;

        return this;
    }

    public isShown() {
        return !this.attributes.hidden;
    }

    public disable(): this {
        this.attributes.disabled = true;

        return this;
    }

    public enable(): this {
        this.attributes.disabled = false;

        return this;
    }
}

export class MenuElementsCollection <T extends MenuElement | MenuElementsCollection<MenuElement>> {
    public data: Array<MenuElementsCollection<T> | T> = [];
    public hidden: boolean;

    protected _id: string;
    public get id(): string { return this._id; }

    public constructor(id?: string) {
        this._id = id;
    }

    public hide(): this {
        this.hidden = true;

        return this;
    }

    public show(): this {
        this.hidden = false;

        return this;
    }

    public isShown() {
        return !this.hidden;
    }

    public find(id: string): MenuElementsCollection<T> | T | undefined {
        return this.data.find(element => {
            if (this.data.length === 0) {
                console.log('--------------- no data! ---------------');

                return false;
            }

            return element.id === id;
        });
    }

    public add(data: Array<MenuElementsCollection<T> | T>): this {
        this.data = this.data.concat(data);

        return this;
    }
}
