import type { AppAttributes } from '../components/app';
import { ComponentFormart } from '../components/interface';
import { ComponentsState } from '../state/components';
import { State } from '../state/state';
import { AseTapManager } from '../tap';
import { AseComponent } from './aseComponent';
import { AseWindow } from './aseWindow';

export class AseView {
  protected window: AseWindow;
  protected tapManager: AseTapManager;
  protected state: State;
  protected _components: ComponentsState;

  constructor() {
    this.tapManager = AseTapManager.singleton(new AseWindow());
    this.window = new AseWindow(this.tapManager);
    this.state = new State(this);
    this._components = new ComponentsState(this);
    this.initialState();
    Object.entries(this.components()).forEach(([key, value]) => {
      this._components.add(key, value);
    });
    this._components.initialize();
    this.window.template = this.render();
    this._components.componentDidMount();
    this.window.render();
  }

  component(name: string): ComponentFormart[] {
    return this._components.obtain(name);
  }

  components(): { [name: string]: AseComponent } {
    return {};
  }

  get renderOptions(): { state: State; window: AseWindow } {
    return { state: this.state, window: this.window };
  }

  rebuild() {
    this.window.destroy();
    this.window.template = this.render();
    this._components.componentDidUpdate();
    this.window.render();
  }

  update() {
    this.rebuild();
  }

  modify(id: string, key: string, value: unknown) {
    this.window.modify(id, key, value);
  }

  initialState() {
    print('initialState is not implemented');
  }

  render(): AppAttributes {
    print('run is not implemented');
    return { children: [] };
  }
}
