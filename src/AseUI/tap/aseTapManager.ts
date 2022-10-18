import { App, Button } from '../components';
import type { AseWindow } from '../window';

export class AseTapManager {
  private _register: Map<string, AseWindow> = new Map();
  static _instance: AseTapManager | null = null;
  private window!: AseWindow;
  private taps: Set<string> = new Set();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(window: AseWindow) {
    this.window = window;
  }

  static singleton(window: AseWindow): AseTapManager {
    if (AseTapManager._instance == null) {
      AseTapManager._instance = new AseTapManager(window);
    }

    return AseTapManager._instance as AseTapManager;
  }

  attach(window: AseWindow): void {
    const { title } = window.dialogOptions;
    if (!title || title === 'taps') {
      return;
    }
    if (this._register.has(title)) {
      return;
    }
    this._register.set(title, window);
  }
  detach(activator: AseWindow): void {
    const { title } = activator.dialogOptions;
    if (!title || title === 'taps') {
      return;
    }
    if (!this._register.has(title)) {
      return;
    }
    // remove botton from tap minimized
    this._register.delete(title);
  }

  initialState() {
    return;
  }

  run() {
    this.window.template = App({
      title: 'Taps',
      children: [...this.taps].map((title) =>
        Button({
          id: `tap-${title}`,
          text: title,
          onclick: () => this.maximize(title),
        })
      ),
    });
  }

  maximize(title: string): void {
    this.window.hide();
    this.taps.delete(title);
    const window = this._register.get(title) as AseWindow;
    window.render();
    this.run();
    this.window.render();
  }

  notyfy(title: string): void {
    if (this.window.active) this.window.hide();
    this.taps.add(title);
    this.run();
    this.window.render();
  }
}
