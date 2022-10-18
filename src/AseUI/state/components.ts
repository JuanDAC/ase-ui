import { ComponentFormart } from '../components/interface';
import { Component } from '../window/aseComponent';
import { AseView } from '../window/aseView';

export class ComponentsState extends Map<string, Component> {
  private _view: AseView;
  constructor(view: AseView) {
    super();
    this._view = view;
  }

  initialize(): void {
    this.components.forEach((component) => {
      component.initialState(this._view.renderOptions);
      component.didMount = component.didUpdate = false;
    });
  }

  get components(): Component[] {
    return [...this.values()];
  }

  componentDidMount(): void {
    this.components
      .filter(({ didMount, didUpdate }) => didMount && !didUpdate)
      .forEach((component) => {
        if (typeof component.componentDidMount === 'function') {
          component.componentDidMount(this._view.renderOptions);
        }
      });
  }

  componentDidUpdate(): void {
    this.components
      .filter(({ didMount, didUpdate }) => didMount && didUpdate)
      .forEach((component) => {
        if (typeof component.componentDidUpdate === 'function') {
          component.componentDidUpdate(this._view.renderOptions);
        }
      });
  }

  obtain(id: string): ComponentFormart[] {
    const aseComponent = this.get(id);

    if (!aseComponent) return [];

    if (
      !aseComponent.didMount && //
      typeof aseComponent.componentWillMount === 'function' //
    ) {
      aseComponent.componentWillMount(this._view.renderOptions);
    }

    if (
      aseComponent.didMount && //
      !aseComponent.didUpdate && //
      typeof aseComponent.componentWillUpdate === 'function' //
    ) {
      aseComponent.componentWillUpdate(this._view.renderOptions);
    }

    if (aseComponent.didMount) {
      aseComponent.didUpdate = true;
    }

    if (!aseComponent.didMount) {
      aseComponent.didMount = true;
    }

    return aseComponent.render(this._view.renderOptions);
  }

  add(id: string, value: Component): void {
    this.set(id, value);
  }
}