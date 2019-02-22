import { DynamicInput, TextDynamicInput } from 'ngx-jsonapi-material';

export let author_form_model: Array<DynamicInput> = [
    new TextDynamicInput('name')
        .setTemplateOption('placeholder', 'Nombre')
        .fxFlex(100)
        .setFocus()
        .required()
        .set('validation', {
            messages: {
                required: 'El nombre del autor es obligatorio'
            }
        })
];
