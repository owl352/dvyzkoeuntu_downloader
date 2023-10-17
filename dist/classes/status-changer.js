"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChanger = void 0;
class StatusChanger {
    constructor(callback, timeout) {
        this.status = "";
        this.destroyed = false;
        this.timeout = timeout;
        this.callback = callback;
        this.update();
    }
    changeStatus(status) {
        if (!this.destroyed) {
            this.status = status;
        }
        else {
            throw new Error("object is destroyed");
        }
    }
    update() {
        if (!this.destroyed) {
            setTimeout(() => {
                if (!this.destroyed) {
                    this.callback(this.status);
                    this.update();
                }
            }, this.timeout);
        }
    }
    destroy() {
        this.destroyed = true;
    }
}
exports.StatusChanger = StatusChanger;
