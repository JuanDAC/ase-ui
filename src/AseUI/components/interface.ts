export interface ComponentFormart {
  text?: string;
  comment?: string;
  children?: ComponentFormart[];
  child?: ComponentFormart;
  tag?: string;
  attributes?: { [key: string]: unknown };
}

export type AseUIEvent<T = unknown> = {
  value: T;
  close: () => void;
  button?: MouseButton;
  color?: Color;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnEvent<T = void, H = unknown> = (this: any, event?: AseUIEvent<H>) => T;
