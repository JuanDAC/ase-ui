import { AseDialog } from '../interfece';
import { AseTap } from './aseTap';
import { AseTapMaximize, AseTapMinimaze, AseTapSubject } from './interface';

export class AseTapManager implements AseTapSubject {
  private _register: Map<AseDialog, AseDialog> = new Map();
  constructor() {}
  attach(window: AseTapMaximize | AseTapMinimaze): void {
    if (this._register.has(window)) {
      return;
    }
    this._register.set(window, new AseTap());
  }
  detach(activator: AseTapMaximize | AseTapMinimaze): void {
    if (!this._register.has(activator)) {
      return;
    }
    const [window, tap] = this.findByWindow(activator);
    tap?.hide();
    tap?.destroy();
    window && this._register.delete(window);
  }
  findByWindow(activator: AseDialog): [AseDialog?, AseDialog?] {
    return [...this._register.entries()].find(([{ id }]) => id === activator.id) ?? [];
  }
  findByTap(activator: AseDialog): [AseDialog?, AseDialog?] {
    return [...this._register.entries()].find(([_, { id }]) => id === activator.id) ?? [];
  }
  notyfy(activator: AseTapMaximize | AseTapMinimaze): void {
    if ('onMinimize' in activator) {
      const [window, tap] = this.findByWindow(activator);
      window?.hide();
      tap?.show();
    }
    if ('onMaximize' in activator) {
      const [window, tap] = this.findByTap(activator);
      tap?.hide();
      window?.show();
    }
  }
}
