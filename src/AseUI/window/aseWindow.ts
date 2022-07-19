/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSON } from '../../services/share/JSON';
import { ComponentFormart } from '../components/interface';
import { AseDialog, AseDialogConfig } from '../interfece';
import { AseTapManager } from '../tap';
import { AseTapMinimaze } from '../tap/interface';

export class AseWindow implements AseDialog, AseTapMinimaze {
  private _id: number;
  private _ui!: Dialog;
  private _aseTapManager: AseTapManager;
  constructor(aseTapManager: AseTapManager) {
    this._aseTapManager = aseTapManager;
    this._id = Math.random();
  }
  template(components: ComponentFormart[]): void {
    console.log(JSON.stringify(components));
  }
  get ui(): Dialog {
    throw new Error('Method not implemented.');
  }
  get dialogOptions(): DialogOptions {
    return {};
  }
  get components(): unknown {
    throw new Error('Method not implemented.');
  }
  createUI(): void {
    this._ui = new Dialog(this.dialogOptions);
  }
  mountComponents(): void {
    throw new Error('Method not implemented.');
  }
  init({ title, components, onclose, position }: AseDialogConfig): void {
    this._aseTapManager.attach(this);
  }
  destroy(): void {
    console.log('Method not implemented.');
  }
  show(): void {
    console.log('Method not implemented.');
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
