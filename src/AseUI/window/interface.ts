import type { AseView } from '../../../window';
import type { ComponentFormart } from '../components/interface';
import type { State } from '../../../state';
import type { AseWindow } from './aseWindow';

export type AseComponentMethodsProps = { state: State; window: AseWindow; view: AseView };

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
