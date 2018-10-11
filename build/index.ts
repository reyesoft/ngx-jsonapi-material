import build from './builder';
import { packages } from './config';

build({
    scope: '@ngx-jsonapi-material',
    packages
}).catch(err => {
    console.error(err);
    process.exit(1);
});
