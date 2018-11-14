export interface ImageChange {
    status_change: 'update' | 'delete';
    source: string;
}
