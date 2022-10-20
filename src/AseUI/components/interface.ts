export interface ComponentFormart {
  text?: string;
  comment?: string;
  children?: ComponentFormart[];
  child?: ComponentFormart;
  tag?: string;
  attributes?: { [key: string]: unknown };
}

export type AseUIEvent = {
  value: any;
  button?: any;
  color?: any;
};

export type OnEvent<T = void> = (this: any, event?: AseUIEvent) => T;
