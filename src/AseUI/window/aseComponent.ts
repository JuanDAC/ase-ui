import { State } from '../state';
import { AseTapManager } from '../tap';
import { AseWindow } from './aseWindow';

export class AseComponent {
  protected window: AseWindow;
  protected tapManager: AseTapManager;
  protected state: State;

  constructor() {
    this.tapManager = AseTapManager.singleton();
    this.window = new AseWindow(this.tapManager);
    this.state = new State(this.window);
    this.initialState();
    this.run();
    this.window.render();
  }

  initialState() {
    console.error('initialState is not implemented');
    throw new Error('initialState is not implemented');
  }

  run() {
    console.error('run is not implemented');
    throw new Error('run is not implemented');
  }
}
