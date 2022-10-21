import { AppAttributes } from '../components/app';
import { AseDialog } from '../interface';
import { AseTapMaximize, AseTapObserver } from './interface';

export class AseTap implements AseDialog, AseTapMaximize, AseTapObserver {
  private _id: number;
  constructor() {
    this._id = Math.random();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modify(id: string, key: string, value: unknown): void {
    print('Method not implemented.');
  }
  set template(components: AppAttributes) {
    print('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get ui(): Dialog {
    print('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get dialogOptions(): DialogOptions {
    print('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get components(): any {
    print('Method not implemented.');
  }
  createUI(): void {
    print('Method not implemented.');
  }
  mountComponents(): void {
    print('Method not implemented.');
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
