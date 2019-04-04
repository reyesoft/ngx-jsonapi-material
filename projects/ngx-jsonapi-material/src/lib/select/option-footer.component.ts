import { Component } from '@angular/core';

@Component({
    selector: 'jam-option-footer',
    templateUrl: './option-footer.component.html'
})
export class JamOptionFooterComponent {
    public addAuthor(target: '_self' | '_blank' = '_self') {
        window.open(
            '//multinexo.com',
            target
        );
    }
}
