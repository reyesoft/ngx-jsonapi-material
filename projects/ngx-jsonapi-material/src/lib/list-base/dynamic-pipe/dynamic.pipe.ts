import { Pipe, PipeTransform, Injector } from '@angular/core';

@Pipe({ name: 'dynamic' })
export class DynamicPipe implements PipeTransform {
    public constructor(private injector: Injector) {}

    public transform(value: any, pipeName: any, pipeArgs?: Array<any>): any {
        pipeArgs = [];
        if (!pipeName) {
            return value;
        }

        let pipe = this.injector.get<any>(pipeName);

        return pipe.transform(value, ...pipeArgs);
    }
}
