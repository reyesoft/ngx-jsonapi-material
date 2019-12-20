import { ComponentRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { DomService } from './dom.service';
export interface IMethodRef {
    method: string;
    params?: any;
}
export declare class SelectionBarService {
    private domService;
    selected$: BehaviorSubject<SelectionModel<any>>;
    callMethod$: BehaviorSubject<IMethodRef>;
    private selectionBarElementId;
    constructor(domService: DomService);
    selected<T>(selected: SelectionModel<T>): void;
    callMethod(methodRef: IMethodRef): void;
    clearMethod(): void;
    init(component: any, inputs: object, outputs: object): ComponentRef<any>;
    destroy(): void;
}
