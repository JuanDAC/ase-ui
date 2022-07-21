import { AseDialog } from "../interface";

export class State extends Map<string, any> {
  private window: AseDialog;
  constructor(window: AseDialog) {
    super();
    this.window = window;
  }
  update(id: string, key: string, update: (this: any, value: any) => any): void {
    const value = update(this.obtain(id, key));
    this.set(`${id}/${key}`, value);
    this.window.modify(id, key, value);
  }

  obtain(id: string, key: string): any {
    return this.get(`${id}/${key}`);
  }

  initial(id: string, key: string, value: any): void {
    this.set(`${id}/${key}`, value);
  }
}
