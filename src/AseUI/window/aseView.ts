import { State } from '../state';
import { ComponentsState } from '../state/components';
import { AseTapManager } from '../tap';
import { AseComponent } from './aseComponent';
import { AseWindow } from './aseWindow';

export class AseView {
  protected window: AseWindow;
  protected tapManager: AseTapManager;
  protected state: State;
  protected _components: ComponentsState;

  constructor() {
    this.tapManager = AseTapManager.singleton();
    this.window = new AseWindow(this.tapManager);
    this.state = new State(this.window);
    this._components = new ComponentsState(this);
    this.initialState();
    Object.entries(this.components()).forEach(([key, value]) => {
      this._components.add(key, value);
    });
    this._components.initialize();
    this.run();
    this._components.componentDidMount();
    this.window.render();
  }

  components(): { [name: string]: AseComponent } {
    return {};
  }

  get renderOptions(): { state: State; window: AseWindow } {
    return { state: this.state, window: this.window };
  }

  rebuild() {
    this.window.destroy();
    this.run();
    this._components.componentDidUpdate();
    this.window.render();
  }

  update() {
    this.rebuild();
  }

  initialState() {
    print('initialState is not implemented');
    throw new Error('initialState is not implemented');
  }

  run() {
    print('run is not implemented');
    throw new Error('run is not implemented');
  }
}
