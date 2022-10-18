import { ComponentFormart } from './interface';

type ElementAttributes = {
  children: ComponentFormart[];
};

export const Component = ({ children }: ElementAttributes): ComponentFormart[] => {
  return [...children];
};
