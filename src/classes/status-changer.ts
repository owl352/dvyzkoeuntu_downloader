export class StatusChanger {
  timeout: number;
  private status: string = "";
  callback: Function;
  private destroyed: boolean = false;
  constructor(callback: Function, timeout: number) {
    this.timeout = timeout;
    this.callback = callback;
    this.update();
  }

  changeStatus(status: string) {
    if (!this.destroyed) {
      this.status = status;
    } else {
      throw new Error("object is destroyed");
    }
  }

  private update() {
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
