import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Resource } from 'ngx-jsonapi';

@Component({
    selector: 'jam-floating-input',
    styleUrls: ['./floating-input.component.scss'],
    templateUrl: './floating-input.component.html'
})
export class FloatingInputComponent {
    public searchParams: UrlTree;
    public status: boolean;

    @Input() public entryValue: number;
    @Input() public resource: Resource;
    @Input() public horPosition: 'start' | 'end';
    @Input() public lock: boolean;

    @Output() public entryValueChange = new EventEmitter<number>();
    @Output() public resourceChange = new EventEmitter<Resource>();

    public constructor(public router: Router) {
        this.searchParams = router.parseUrl(router.url);
        this.lock = this.lock || false;
    }

    public statusToggle(status: boolean): void {
        if (!this.lock) {
            this.status = status;
            setTimeout(() => {
                if (!status) {
                    return;
                }

                this.focusInput();
            }, 100);
        }
    }

    public bindingEntryValue(value: number) {
        this.entryValueChange.emit(value);
    }

    public keyPress(keyCode: number) {
        switch (keyCode) {
            case 13:
                this.status = false;
                break;
        }
    }

    private focusInput(): void {
        let input = document.getElementById('floatingInput');
        input.focus();
    }
}
