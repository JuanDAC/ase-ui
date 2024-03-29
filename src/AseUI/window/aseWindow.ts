import { deepCopy } from 'juandac/ase-deep-copy/src/main';
import { AppAttributes } from '../components/app';
import { OnEvent } from '../components/interface';
import { AseDialog } from '../interface';
import { AseTapManager } from '../../../tap';
import { AseTapMinimaze } from '../tap/interface';

export class AseWindow implements AseDialog, AseTapMinimaze {
  private _id: number;
  private _ui!: Dialog;
  private _template: AppAttributes = { children: [] };
  private _aseTapManager?: AseTapManager;
  private _active = false;
  private _position: Rectangle | null = null;

  constructor(aseTapManager?: AseTapManager) {
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

  get active(): boolean {
    return this._active;
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

  bindEvents(name: string, eventHandler: unknown, attributes: { [key: string]: unknown }): void {
    if (attributes && typeof eventHandler === 'function' && name.startsWith('on') && name !== 'onclose') {
      const id = attributes.id as keyof typeof this.state;
      const close = () => this.destroy();
      const onEvent = eventHandler as OnEvent;
      attributes[name as keyof typeof attributes] = (event: object = {}) => {
        const value = this.state[id];
        onEvent({ ...event, close, value });
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseComponents(attributes: { [key: string]: unknown }): (this: any, entry: [string, unknown]) => void {
    return ([key, value]) => {
      this.bindEvents(key, value, attributes);
    };
  }

  shadesOnClick(): OnEvent {
    return (ev) => {
      if (ev?.button === MouseButton.LEFT) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        app.fgColor = ev.color;
      } else if (ev?.button == MouseButton.RIGHT) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        app.bgColor = ev.color;
      }
    };
  }

  mountComponents(): void {
    const { children } = this.components;
    children.forEach((component) => {
      const { tag } = component;
      const nameMethod = tag as keyof Dialog;
      if (tag && typeof this.ui[nameMethod] === 'function') {
        const method = this.ui[nameMethod] as (this: Dialog, config: object) => Dialog;
        component.attributes ??= {};
        if (tag === 'shades' && typeof component.attributes['onclick'] !== 'function') {
          component.attributes['onclick'] = this.shadesOnClick();
        }
        Object.entries(component.attributes).forEach(this.parseComponents(component.attributes));
        return method.call(this.ui, { ...component.attributes });
      }
    });
  }

  init(): void {
    return;
  }

  destroy(): void {
    this._position = this._ui.bounds;
    this.ui.close();
    this._active = false;
  }

  show(): void {
    const { bounds } = this._ui;
    bounds.x = this._position ? this._position.x : bounds.x;
    bounds.y = this._position ? this._position.y : bounds.y;
    const showConfig: ComponentOptions = {
      wait: false,
      bounds,
    };
    this.ui.show(showConfig);
    this._active = true;
  }

  get id(): number {
    return this._id;
  }

  onMinimize(): void {
    this._aseTapManager?.notyfy(this.dialogOptions.title as string);
  }

  hide(): void {
    this.destroy();
  }

  render(): void {
    this.createUI();
    this.mountComponents();
    this._aseTapManager?.attach(this);
    this.show();
  }

  modify(id: string, key: string, value: unknown): void {
    if (Object.keys(this.state).includes(id)) this.ui.modify({ id, [key]: value });

    if (!Object.keys(this.state).includes(id)) print(`${id} not found`);
  }
}
