/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSON } from '../../services/share/JSON';
import { AppAttributes } from '../components/app';
import { AseDialog, AseDialogConfig } from '../interfece';
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
    return this._ui;
  }
  get dialogOptions(): DialogOptions {
    const { title, onclose, position } = this._template;
    return {
      title,
      onclose,
      position,
    };
  }
  get components(): unknown {
    throw new Error('Method not implemented.');
  }
  createUI(): void {
    this._ui = new Dialog(this.dialogOptions);
  }
  mountComponents(): void {
    const { children } = this._template;
    children.map((component) => {
      const { tag } = component;
      print(tag);
      if (tag && typeof this._ui[tag as keyof typeof this._ui] === 'function') {
        Object.entries(component.attributes ?? {}).forEach(([key, value]) => {
          if (component && typeof value === 'function') {
            component.attributes![key as keyof typeof component.attributes] = value(null, this);
          }
        });
        this._ui[tag as keyof typeof this._ui]({ ...component.attributes });
      }
    });
  }
  init(): void {
    this._aseTapManager.attach(this);
  }
  destroy(): void {
    this._ui.close();
  }
  show(): void {
    this._ui.show({ wait: false });
  }
  get id(): number {
    return this._id;
  }
  onMinimize(): void {
    this._aseTapManager.notyfy(this);
  }
  hide(): void {
    console.log('Method not implemented.');
  }
  render(): void {
    console.log('Method not implemented.');
  }
}
