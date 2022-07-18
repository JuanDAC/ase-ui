export interface AseDialog {
  get id(): number;
  hide(): void;
  render(): void;
  show(): void;
  init(): void;
  destroy(): void;
}
