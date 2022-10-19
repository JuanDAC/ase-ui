import { ComponentFormart } from './interface';

type ElementAttributes = {
  children: (ComponentFormart | ComponentFormart[])[];
};

export const Component = ({ children }: ElementAttributes): ComponentFormart[] => children.flat();
