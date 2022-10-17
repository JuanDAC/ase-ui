import { AppAttributes } from '../components/app';
import { AseDialog } from '../interface';
import { AseTapMaximize, AseTapObserver } from './interface';

export class AseTap implements AseDialog, AseTapMaximize, AseTapObserver {
  private _id: number;
  constructor() {
    this._id = Math.random();
  }
  modify(id: string, key: string, value: any): void {
    throw new Error('Method not implemented.');
  }
  set template(components: AppAttributes) {
    throw new Error('Method not implemented.');
  }
  get ui(): Dialog {
    throw new Error('Method not implemented.');
  }
  get dialogOptions(): DialogOptions {
    throw new Error('Method not implemented.');
  }
  get components(): any {
    throw new Error('Method not implemented.');
  }
  createUI(): void {
    throw new Error('Method not implemented.');
  }
  mountComponents(): void {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  destroy(): void {
    print('Method not implemented.');
  }
  show(): void {
    print('Method not implemented.');
  }
  init(): void {
    print('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(state: object): void {
    print('Method not implemented.');
  }
  get id(): number {
    return this._id;
  }
  onMaximize(): void {
    print('Method not implemented.');
  }
  hide(): void {
    print('Method not implemented.');
  }
  render(): void {
    print('Method not implemented.');
  }
}
