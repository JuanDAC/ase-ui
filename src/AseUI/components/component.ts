import { ComponentFormart } from './interface';

type ElementAttributes = {
  children: (ComponentFormart | ComponentFormart[])[];
  visible?: boolean;
};

export const Component = ({ children, visible = true }: ElementAttributes): ComponentFormart[] => (visible ? children.flat() : []);
