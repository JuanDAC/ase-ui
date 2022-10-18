import type { AseView } from '../window';

type InitialShareProps = { group: string; ids: string[]; key: string; initialValue: any; modify?: boolean };

type UpdateShareProps = { group: string; key: string; update: (this: any, value: any) => any };

type ObtainShareProps = { group: string; key: string };

type InitialProps = { id: string; key: string; initialValue: any; modify?: boolean };

type UpdateProps = { id: string; key: string; update: (this: any, value: any) => any };

type ObtainProps = { id: string; key: string };

export class State extends Map<string, { value: any; modify: boolean; ids?: string[] }> {
  private _view: AseView;
  constructor(view: AseView) {
    super();
    this._view = view;
  }

  initialShare({ group, ids, key, value, modify = true }: InitialShareProps): void {
    this.set(`group/${group}/${key}`, { value, ids, modify });
  }

  updateShare({ group, key, update }: UpdateShareProps): void {
    const { value: oldValue, ids, modify } = this.get(`group/${group}/${key}`) as { ids: string[]; value: any; modify: boolean };
    const value = update(oldValue);
    this.set(`group/${group}/${key}`, { value, modify, ids });
    if (modify) ids.forEach((id) => this._view.modify(id, key, value));
    if (!modify) this._view.update();
  }

  obtainShare({ group, key }: ObtainShareProps): any {
    const { value } = this.get(`group/${group}/${key}`) as { ids: string[]; value: any };
    return value;
  }

  update({ id, key, update }: UpdateProps): void {
    // TODO: Fix get value and storage variables
    const { value: oldValue, modify } = this.get(`${id}/${key}`) ?? {};
    const value = update(oldValue);
    this.set(`${id}/${key}`, { value, modify: !!modify });
    if (modify) this._view.modify(id, key, value);
    if (!modify) this._view.update();
  }

  obtain({ id, key }: ObtainProps): any {
    const { value } = this.get(`${id}/${key}`) ?? {};
    return value;
  }

  initial({ id, key, value, modify = true }: InitialProps): void {
    this.set(`${id}/${key}`, { value, modify });
  }
}
