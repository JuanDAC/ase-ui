export interface ComponentFormart {
  text?: string;
  comment?: string;
  children?: ComponentFormart[];
  child?: ComponentFormart;
  tag?: string;
  attributes?: { [key: string]: unknown };
}

export type AseUIEvent<T = any> = {
  value: T;
  button?: any;
  color?: any;
};

export type OnEvent<T = void, H = any> = (this: any, event?: AseUIEvent<H>) => T;
