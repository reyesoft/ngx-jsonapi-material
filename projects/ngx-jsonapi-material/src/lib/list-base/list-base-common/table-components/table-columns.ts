import { TemplateRef } from '@angular/core';
import { Resource, DocumentResource, DocumentCollection } from 'ngx-jsonapi';

export class Action {
    public constructor(
        public key: string,
        public name: string,
        public tooltip: string,
        public icon: { svg?: string; material?: string },
        public classes?: string
    ) {
        /**/
    }
}

export class Column {
    public cell_value_from_relationship_attribute: {
        relationship: string;
        attribute: string;
        related_resource_id?: string;
        has_one?: boolean;
    };
    public template_only = false;
    public show_mobile_title = true;
    public hide_mobile_cell = false;
    public sort_key: string;
    public form_field: {
        input?: { type: string };
        select?: { options: Array<any> };
        checkbox?: { text: string };
    };

    public constructor(
        public key: string,
        public title?: string,
        public tooltip?: string,
        public classes: { header?: string; cell?: string; cell_data?: string } = {},
        public styles: { header?: { [key: string]: string }; cell?: { [key: string]: string }; cell_data?: { [key: string]: string } } = {},
        public pipe?: IColumnPipe,
        public template?: TemplateRef<any>,
        public default_value?: any,
        public icon?: {
            tooltip?: string;
            name?: string;
            style?: { [key: string]: any };
            classes?: Array<string>;
            type?: 'material' | 'svg';
            getIconTooltipFromResource?(resource: Resource): string;
            getIconNameFromResource?(resource: Resource): string;
        },
        public mobile_title?: string
    ) {}

    public setKey(key: string): Column {
        this.key = key;

        return this;
    }

    public setTitle(title: string): Column {
        this.title = title;

        return this;
    }

    public setTooltip(tooltip: string): Column {
        this.tooltip = tooltip;

        return this;
    }

    public setHeaderClasses(header_classes: string): Column {
        this.classes.header = header_classes;

        return this;
    }

    public setHeaderStyles(header_styles: { [key: string]: string }): Column {
        this.styles.header = header_styles;

        return this;
    }

    public setCellClasses(classes: string): Column {
        this.classes.cell = classes;

        return this;
    }

    public setCellStyles(classes: { [key: string]: string }): Column {
        this.styles.cell = classes;

        return this;
    }

    public setCellDataClasses(classes: string): Column {
        this.classes.cell_data = classes;

        return this;
    }

    public setCellDataStyles(classes: { [key: string]: string }): Column {
        this.styles.cell_data = classes;

        return this;
    }

    public setPipe(pipe: IColumnPipe): Column {
        this.pipe = pipe;

        return this;
    }

    public setTemplate(template: TemplateRef<any>): Column {
        this.template = template;

        return this;
    }

    public setFormField(type: 'text'|'number'): Column {
        // TODO: COL-2387 estos datos deberían generarse diánimcamente, crear factory para diferentes tipos de campos
        this.form_field = { input: { type: type }};

        return this;
    }

    public setDefault(default_value: any): Column {
        this.default_value = default_value;

        return this;
    }

    public setIcon(icon: Column['icon']): Column | any {
        if (!icon.name && !icon.getIconNameFromResource) {
            console.error(`You should set the icon's name inside the Column.icon.getIconNameFromResource function`);
        }

        this.icon = {
            tooltip: icon.tooltip,
            style: icon.style,
            classes: icon.classes,
            name: icon.name,
            type: icon.type,
            getIconTooltipFromResource: icon.getIconTooltipFromResource,
            getIconNameFromResource: icon.getIconNameFromResource
        };

        return this;
    }

    public setCellValueFromRelationshipAttribute(relationship_attribute: Column['cell_value_from_relationship_attribute']): Column {
        this.cell_value_from_relationship_attribute = relationship_attribute;

        return this;
    }

    public getValueFromRelationshipAttribute(resource: Resource): any {
        if (
            !this.cell_value_from_relationship_attribute ||
            !resource.relationships[this.cell_value_from_relationship_attribute.relationship] ||
            !resource.relationships[this.cell_value_from_relationship_attribute.relationship].data
        ) {
            return undefined;
        }
        if (this.cell_value_from_relationship_attribute.has_one) {
            return (<DocumentResource>resource.relationships[this.cell_value_from_relationship_attribute.relationship]).data.attributes[
                this.cell_value_from_relationship_attribute.attribute
            ];
        }

        return this.cell_value_from_relationship_attribute.related_resource_id === undefined
            ? undefined
            : (<DocumentCollection>resource.relationships[this.cell_value_from_relationship_attribute.relationship]).find(
                  this.cell_value_from_relationship_attribute.related_resource_id
              ).attributes[this.cell_value_from_relationship_attribute.attribute];
    }

    public templateOnly(value: boolean): Column {
        this.template_only = value;

        return this;
    }

    public showMobileTitle(): this {
        this.show_mobile_title = true;

        return this;
    }

    public hideMobileTitle(): this {
        this.show_mobile_title = false;

        return this;
    }

    public hideOnMobile(): this {
        this.hide_mobile_cell = true;

        return this;
    }

    public setSortKey(key?: string): this {
        this.sort_key = key || this.key;

        return this;
    }
}

export interface IColumnPipe {
    pipe: any; // had to remove Pipe type because different pipes have different pipes... and dont inherit
    arg?: any;
    attribute_key_arg?: string;
}
