import { AseDialog } from '../interface';

export interface AseTapMaximize extends AseDialog {
  onMaximize(): void;
}

export interface AseTapMinimaze extends AseDialog {
  onMinimize(): void;
}

export interface AseTapSubject {
  attach(tap: AseTapMaximize | AseTapMinimaze): void;
  detach(tap: AseTapMaximize | AseTapMinimaze): void;
  notyfy(tap: AseTapMaximize | AseTapMinimaze): void;
}

export interface AseTapObserver {
  update(state: object): void;
}
