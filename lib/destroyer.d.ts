import { UnaryFunction, Observable } from 'rxjs';
export declare class Destroyer {
    private takeuntil;
    pipe(): UnaryFunction<Observable<any>, Observable<any>>;
    destroy(): void;
}
