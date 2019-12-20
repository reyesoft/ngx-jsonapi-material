export declare class MenuElement {
    attributes: {
        [key: string]: any;
    };
    protected _id: string;
    readonly id: string;
    constructor(id?: string);
    setAttributes(attribute: string, value: any): this;
    addAttributes(attributes: {
        [key: string]: any;
    }): this;
    hide(): this;
    show(): this;
    isShown(): boolean;
    disable(): this;
    enable(): this;
}
export declare class MenuElementsCollection<T extends MenuElement | MenuElementsCollection<MenuElement>> {
    data: Array<MenuElementsCollection<T> | T>;
    hidden: boolean;
    protected _id: string;
    readonly id: string;
    constructor(id?: string);
    hide(): this;
    show(): this;
    isShown(): boolean;
    find(id: string): MenuElementsCollection<T> | T | undefined;
    add(data: Array<MenuElementsCollection<T> | T>): this;
}
