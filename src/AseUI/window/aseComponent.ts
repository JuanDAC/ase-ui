import { ComponentFormart } from '../components/interface';
import { State } from '../state';
import { AseWindow } from './aseWindow';

export type AseComponentMethodsProps = { state: State; window: AseWindow };

export interface Component {
  initialState(_: AseComponentMethodsProps): void;
  componentDidMount?(_: AseComponentMethodsProps): void;
  componentDidUpdate?(_: AseComponentMethodsProps): void;
  componentWillUpdate?(_: AseComponentMethodsProps): void;
  componentWillMount?(_: AseComponentMethodsProps): void;
  render(_: AseComponentMethodsProps): ComponentFormart[];
  didMount: boolean;
  didUpdate: boolean;
}

export class AseComponent implements Component {
  didMount: boolean;
  didUpdate: boolean;
  constructor() {
    this.didMount = false;
    this.didUpdate = false;
  }

  initialState() {
    print('initialState is not implemented');
    throw new Error('initialState is not implemented');
  }

  render() {
    print('initialState is not implemented');
    throw new Error('initialState is not implemented');
    return [];
  }
}
