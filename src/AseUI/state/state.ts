import type { AseView } from '../window';

export class State extends Map<string, any> {
  private _view: AseView;
  constructor(view: AseView) {
    super();
    this._view = view;
  }

  initialShare(group: string, ids: string[], key: string, value: any, modify = true): void {
    this.set(`group/${group}/${key}`, { value, ids, modify });
  }

  updateShare(group: string, key: string, update: (this: any, value: any) => any): void {
    const { value: oldValue, ids, modify } = this.get(`group/${group}/${key}`) as { ids: string[]; value: any, modify: boolean };
    const value = update(oldValue);
    this.set(`group/${group}/${key}`, { value, ids });
    ids.forEach((id) => this._view.modify(id, key, value));
    if (modify)
      ids.forEach((id) => this._view.modify(id, key, value));
    if (!modify)
      this._view.update()
  }

  obtainShare(group: string, key: string): any {
    const { value } = this.get(`group/${group}/${key}`) as { ids: string[]; value: any };
    return value;
  }

  update(id: string, key: string, update: (this: any, value: any) => any): void {
    const value = update(this.obtain(id, key));
    this.set(`${id}/${key}`, value);
    this._view.modify(id, key, value);
  }

  obtain(id: string, key: string): any {
    return this.get(`${id}/${key}`);
  }

  initial(id: string, key: string, value: any): void {
    this.set(`${id}/${key}`, value);
  }
}
