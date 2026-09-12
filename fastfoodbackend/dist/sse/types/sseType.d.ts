export type SseCreateCommand<T> = {
    orderId: number;
    command: 'add';
    order: T;
};
export type SseRemoveCommand = {
    orderId: number;
    command: 'remove';
};
