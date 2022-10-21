import { ComponentFormart } from '../components/interface';
import { AseComponentMethodsProps, Component } from './interface';

export class AseComponent implements Component {
  didMount: boolean;
  didUpdate: boolean;
  constructor() {
    this.didMount = false;
    this.didUpdate = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialState(_: AseComponentMethodsProps) {
    print('initialState is not implemented');
    print('initialState is not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  render<T = any>(_: AseComponentMethodsProps & T): ComponentFormart[] {
    print('initialState is not implemented');
    print('initialState is not implemented');
    return [];
  }
}
