import { TopWarningService } from './top-warning.service';
export declare class TopWarningComponent {
    topWarningService: TopWarningService;
    opened: boolean;
    button_state: 'expanded' | 'contracted' | 'standby';
    button_icons: {
        expanded: string;
        contracted: string;
        standby: string;
    };
    constructor(topWarningService: TopWarningService);
    onMouseEnter(): void;
    onMouseLeave(): void;
    toggleOpenAccordion(opened: boolean): void;
    defaultAccordionState(): void;
}
