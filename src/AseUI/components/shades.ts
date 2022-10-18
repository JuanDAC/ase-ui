import { ComponentFormart, OnEvent } from './interface';

type ShadesAttributes = {
  id: string;
  label?: string;
  mode?: 'pick' | 'sort';
  visible?: boolean;
  colors?: Color[];
  onclick?: OnEvent;
};

export const Shades = ({ id, label, mode, colors, onclick, visible }: ShadesAttributes): ComponentFormart => {
  return {
    tag: 'shades',
    attributes: {
      id,
      label,
      mode,
      colors,
      visible,
      onclick,
    },
  };
};
