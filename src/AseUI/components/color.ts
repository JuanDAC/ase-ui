import { AseDialog } from '../interfece';
import { ComponentFormart } from './interface';

type ColorAttributes = {
  id: string;
  label?: string;
  color?: Color;
  visible?: boolean;
  onchange?: (self: AseDialog, ...arg: unknown[]) => () => void;
};

export const Color = ({ id, label, color, visible, onchange }: ColorAttributes): ComponentFormart => {
  return {
    tag: 'color',
    attributes: {
      id,
      label,
      color,
      visible,
      onchange,
    },
  };
};
