import { AseDialog } from '../interface';

export class State extends Map<string, any> {
  private window: AseDialog;
  constructor(window: AseDialog) {
    super();
    this.window = window;
  }

  initialShare(group: string, ids: string[], key: string, value: any): void {
    this.set(`group/${group}/${key}`, { value, ids });
  }

  updateShare(group: string, key: string, update: (this: any, value: any) => any): void {
    const { value: oldValue, ids } = this.get(`group/${group}/${key}`) as { ids: string[]; value: any };
    const value = update(oldValue);
    this.set(`group/${group}/${key}`, { value, ids });
    ids.forEach((id) => this.window.modify(id, key, value));
  }

  obtainShare(group: string, key: string): any {
    const { value } = this.get(`group/${group}/${key}`) as { ids: string[]; value: any };
    return value;
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
