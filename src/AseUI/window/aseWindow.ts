/* eslint-disable @typescript-eslint/no-unused-vars */
import { deepCopy } from '../../services/share/deppCopy';
import { JSON } from '../../services/share/JSON';
import { AppAttributes } from '../components/app';
import { OnEvent } from '../components/interface';
import { AseDialog } from '../interface';
import { AseTapManager } from '../tap';
import { AseTapMinimaze } from '../tap/interface';

export class AseWindow implements AseDialog, AseTapMinimaze {
  private _id: number;
  private _ui!: Dialog;
  private _template: AppAttributes = { children: [] };
  private _aseTapManager: AseTapManager;
  constructor(aseTapManager: AseTapManager) {
    this._aseTapManager = aseTapManager;
    this._id = Math.random();
    this.init();
  }
  set template(components: AppAttributes) {
    this._template = components;
  }
  get ui(): Dialog {
    if (this._ui == null) this.createUI();
    return this._ui;
  }

  get state(): Dialog['data'] {
    return this.ui.data;
  }
  get ok(): Dialog['data']['ok'] {
    return !!this.ui.data.ok;
  }

  get dialogOptions(): DialogOptions {
    const { title, onclose, position } = this.components;
    return {
      title,
      onclose,
      position,
    };
  }
  get components(): AppAttributes {
    return deepCopy(this._template);
  }
  createUI(): void {
    this._ui = new Dialog(this.dialogOptions);
  }
  bindEvents(key: string, value: unknown, attributes: { [key: string]: any }): void {
    if (attributes && typeof value === 'function' && key.startsWith('on')) {
      const onEvent: OnEvent = value as OnEvent;
      attributes[key as keyof typeof attributes] = onEvent(this);
    }
  }
  parseComponents(attributes: object): (this: any, entry: [string, unknown]) => void {
    return ([key, value]) => {
      this.bindEvents(key, value, attributes);
    };
  }
  mountComponents(): void {
    const { children } = this.components;
    children.map((component) => {
      const { tag } = component;
      const nameMethod: keyof Dialog = tag as keyof Dialog;
      if (tag && typeof this.ui[nameMethod] === 'function') {
        const method = this.ui[nameMethod] as (this: Dialog, config: object) => Dialog;
        /* Object.entries(component.attributes ?? {}).forEach(this.parseComponents(component.attributes ?? {})); */
        method.call(this.ui, { ...component.attributes });
      }
    });
  }
  init(): void {
    this._aseTapManager.attach(this);
  }
  destroy(): void {
    this.ui.close();
  }
  show(): void {
    this.ui.show({ wait: false });
  }
  get id(): number {
    return this._id;
  }
  onMinimize(): void {
    this._aseTapManager.notyfy(this);
  }
  hide(): void {
    this.ui.close();
  }
  render(): void {
    this.createUI();
    this.mountComponents();
    this.show();
  }

  modify(id: string, key: string, value: any): void {
    if (Object.keys(this.state).includes(id)) {
      this.ui.modify({ id, [key]: value });
    } else {
      console.error(`${id} not found`);
    }
  }
}
