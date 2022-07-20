import { AseDialog } from '../interfece';
import { ComponentFormart } from './interface';

type ShadesAttributes = {
  id: string;
  label?: string;
  mode?: 'pick' | 'sort';
  colors?: Color[];
  onclick?: (self: AseDialog, ...arg: unknown[]) => () => void;
};

export const Shades = ({ id, label, mode, colors, onclick }: ShadesAttributes): ComponentFormart => {
  return {
    tag: 'shades',
    attributes: {
      id,
      label,
      mode,
      colors,
      onclick,
    },
  };
};
