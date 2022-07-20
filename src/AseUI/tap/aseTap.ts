import { AppAttributes } from '../components/app';
import { AseDialog } from '../interfece';
import { AseTapMaximize, AseTapObserver } from './interface';

export class AseTap implements AseDialog, AseTapMaximize, AseTapObserver {
  private _id: number;
  constructor() {
    this._id = Math.random();
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
    console.log('Method not implemented.');
  }
  show(): void {
    console.log('Method not implemented.');
  }
  init(): void {
    console.log('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(state: object): void {
    console.log('Method not implemented.');
  }
  get id(): number {
    return this._id;
  }
  onMaximize(): void {
    console.log('Method not implemented.');
  }
  hide(): void {
    console.log('Method not implemented.');
  }
  render(): void {
    console.log('Method not implemented.');
  }
}
