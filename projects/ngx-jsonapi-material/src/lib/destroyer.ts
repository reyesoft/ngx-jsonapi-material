import { Subject , UnaryFunction , Observable , pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class Destroyer {
    private takeuntil: Subject<void> = new Subject();

    public pipe(): UnaryFunction<Observable<any>, Observable<any>> {
        return pipe(takeUntil(this.takeuntil));
    }

    public destroy(): void {
        this.takeuntil.next();
        this.takeuntil.complete();
    }
}
