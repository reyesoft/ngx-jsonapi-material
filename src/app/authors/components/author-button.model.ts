import { Button, Option } from "ngx-jsonapi-material";

export const menu_options_model: Array<Option> = [
    {
        section: 'Edit and add',
        buttons: [
            new Button('newAuthor')
                .addButtonAttributes({
                    label: 'New author',
                    icon: 'person_add'
                })
        ]
    },
    {
        section: 'Others',
        buttons: [
            new Button('removeRelationship')
                .addButtonAttributes({
                    label: 'Remove relationship',
                    icon: 'delete'
                })
        ]
    }
]
