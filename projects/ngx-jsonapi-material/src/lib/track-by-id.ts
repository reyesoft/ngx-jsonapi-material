import { Resource } from 'ngx-jsonapi';

export function trackById(index, resource: Resource) {
    return resource.id;
}
