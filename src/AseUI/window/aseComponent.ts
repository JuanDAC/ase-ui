import { ComponentFormart } from '../components/interface';
import { AseComponentMethodsProps, Component } from './interface';

export class AseComponent implements Component {
  didMount: boolean;
  didUpdate: boolean;
  constructor() {
    this.didMount = false;
    this.didUpdate = false;
  }

  initialState(_: AseComponentMethodsProps) {
    print('initialState is not implemented');
    throw new Error('initialState is not implemented');
  }

  render(_: AseComponentMethodsProps): ComponentFormart[] {
    print('initialState is not implemented');
    throw new Error('initialState is not implemented');
    return [];
  }
}
