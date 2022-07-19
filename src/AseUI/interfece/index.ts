import { ComponentFormart } from '../components/interface';

export interface AseDialogConfig {
  title: object | string;
  components?: ComponentOptions;
  onclose?: () => void;
  position?: object;
}

export interface AseDialog {
  get id(): number;
  get ui(): Dialog;
  get dialogOptions(): DialogOptions;
  get components(): unknown;
  createUI(): void;
  mountComponents(): void;
  hide(): void;
  render(): void;
  show(): void;
  init(config: AseDialogConfig): void;
  template(components: ComponentFormart[]): void;
  destroy(): void;
}
