export declare class StatusChanger {
    timeout: number;
    private status;
    callback: Function;
    private destroyed;
    constructor(callback: Function, timeout: number);
    changeStatus(status: string): void;
    private update;
    destroy(): void;
}
