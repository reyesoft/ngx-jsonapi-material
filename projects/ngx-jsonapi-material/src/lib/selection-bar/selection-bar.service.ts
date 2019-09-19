import { Injectable, ComponentRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { DomService } from './dom.service';

export interface IMethodRef {
    method: string;
    params?: any;
}

@Injectable()
export class SelectionBarService {
    public selected$: BehaviorSubject<SelectionModel<any>> = new BehaviorSubject(new SelectionModel());
    public callMethod$: BehaviorSubject<IMethodRef> = new BehaviorSubject({ method: '' });
    private selectionBarElementId = 'selection-bar-container';

    public constructor(private domService: DomService) {}

    public selected<T>(selected: SelectionModel<T>): void {
        this.selected$.next(selected);
    }

    public callMethod(methodRef: IMethodRef): void {
        this.callMethod$.next(methodRef);
    }

    public clearMethod() {
        this.callMethod({ method: '' });
    }

    public init(component: any, inputs: object, outputs: object): ComponentRef<any> {
        let componentConfig = {
            inputs: inputs,
            outputs: outputs
        };

        if (document.getElementById(this.selectionBarElementId).className === 'show') {
            return undefined; // ts-lint => Value-returning function should use `return undefined;`, not just `return;`
        }

        let created_component_instance = this.domService.appendComponentTo(this.selectionBarElementId, component, componentConfig);
        document.getElementById(this.selectionBarElementId).className = 'show';

        return created_component_instance;
    }

    public destroy(): void {
        this.domService.removeComponent();
        document.getElementById(this.selectionBarElementId).className = 'hidden';
    }
}
