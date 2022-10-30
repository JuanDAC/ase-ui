import type { AseView } from '../../../window';

type ValueState = string | boolean | number | unknown;

type InitialShareProps<T = ValueState> = { group: string; ids: string[]; key: string; initialValue: T; modify?: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UpdateShareProps<T = ValueState> = { group: string; key: string; update: (this: any, value: T) => T; rebuild?: boolean };

type ObtainShareProps = { group: string; key: string };

type InitialProps<T = ValueState> = { id: string; key: string; initialValue: T; modify?: boolean };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UpdateProps<T = ValueState> = { id: string; key: string; update: (this: any, value: T) => T; rebuild?: boolean };

type ObtainProps = { id: string; key: string };

export class State extends Map<string, { value: ValueState; modify: boolean; ids?: string[] }> {
  private _view: AseView;
  constructor(view: AseView) {
    super();
    this._view = view;
  }

  initialShare<T = ValueState>({ group, ids, key, initialValue, modify = true }: InitialShareProps<T>): void {
    this.set(`group/${group}/${key}`, { value: initialValue, ids, modify });
  }

  updateShare<T = ValueState>({ group, key, update, rebuild = true }: UpdateShareProps<T>): void {
    const { value: oldValue, ids, modify } = this.get(`group/${group}/${key}`) ?? {};
    const value = update(oldValue as T);
    this.set(`group/${group}/${key}`, { value, modify: !!modify, ids });
    if (modify && rebuild) (ids ?? []).forEach((id) => this._view.modify(id, key, value));
    if (!modify && rebuild) this._view.update();
  }

  obtainShare<T = ValueState>({ group, key }: ObtainShareProps): T {
    const { value } = this.get(`group/${group}/${key}`) ?? {};
    return value as T;
  }

  update<T = ValueState>({ id, key, update, rebuild = true }: UpdateProps<T>): void {
    const { value: oldValue, modify } = this.get(`${id}/${key}`) ?? {};
    const value = update(oldValue as T);
    this.set(`${id}/${key}`, { value, modify: !!modify });
    if (modify && rebuild) this._view.modify(id, key, value);
    if (!modify && rebuild) this._view.update();
  }

  obtain<T = ValueState>({ id, key }: ObtainProps): T {
    const { value } = this.get(`${id}/${key}`) ?? {};
    return value as T;
  }

  initial<T = ValueState>({ id, key, initialValue, modify = true }: InitialProps<T>): void {
    this.set(`${id}/${key}`, { value: initialValue, modify });
  }
}
