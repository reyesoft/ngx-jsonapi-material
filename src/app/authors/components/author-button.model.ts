import { Button, Menu, Section } from 'ngx-jsonapi-material';

export const menu_options_model: Menu = new Menu().addSections([
    new Section('Edit and add').addButtons([
        new Button('newAuthor').addAttributes({
            label: 'New author',
            icon: 'person_add'
        })
    ]),
    new Section('Others').addButtons([
        new Button('removeRelationship').addAttributes({
            label: 'Remove relationship',
            icon: 'delete'
        })
    ])
]);
