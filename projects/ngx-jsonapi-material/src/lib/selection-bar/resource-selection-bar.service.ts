import { BehaviorSubject } from 'rxjs';

export interface IMethodRef {
    method: string;
    params?: any;
}

export class ResourceSelectionBarService {
    public selected$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    public callMethod$: BehaviorSubject<IMethodRef> = new BehaviorSubject({ method: '' });

    public selected<T>(selected: Array<T>): void {
        this.selected$.next(selected);
    }

    public callMethod(methodRef: IMethodRef): void {
        this.callMethod$.next(methodRef);
    }

    public clearMethod() {
        this.callMethod({ method: '' });
    }
}
