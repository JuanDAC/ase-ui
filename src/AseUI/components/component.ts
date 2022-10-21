import { ComponentFormart } from './interface';

type ElementAttributes = {
  children: (ComponentFormart | ComponentFormart[])[];
  visible?: boolean;
};

export const Component = ({ children, visible = true }: ElementAttributes): ComponentFormart[] => (visible ? children.flat() : []);
export const Div = Component;
export const Column = Component;
export const Row = Component;
