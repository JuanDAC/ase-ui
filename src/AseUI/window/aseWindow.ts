import { AseDialog } from '../interfece';
import { AseTapManager } from '../tap';
import { AseTapMinimaze } from '../tap/interface';

export class AseWindow implements AseDialog, AseTapMinimaze {
  private _id: number;
  private _aseTapManager: AseTapManager;
  constructor(aseTapManager: AseTapManager) {
    this._aseTapManager = aseTapManager;
    this._id = Math.random();
    this.init();
  }
  init(): void {
    Dialog("juan ve a dormir").show();
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
