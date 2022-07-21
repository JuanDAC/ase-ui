import { AppAttributes } from '../components/app';

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
  set template(components: AppAttributes);
  modify(id: string, key: string, value: any): void;
  createUI(): void;
  mountComponents(): void;
  hide(): void;
  render(): void;
  show(): void;
  init(): void;
  destroy(): void;
}
