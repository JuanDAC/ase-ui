import { AseDialog } from '../interfece';
import { AseTapMaximize, AseTapObserver } from './interface';

export class AseTap implements AseDialog, AseTapMaximize, AseTapObserver {
  private _id: number;
  constructor() {
    this._id = Math.random();
  }
  destroy(): void {
    console.log('Method not implemented.');
  }
  show(): void {
    console.log('Method not implemented.');
  }
  init(): void {
    console.log('Method not implemented.');
  }
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
