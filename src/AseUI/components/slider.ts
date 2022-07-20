import { AseDialog } from '../interfece';
import { ComponentFormart } from './interface';

type SliderAttributes = {
  id: string;
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  onchange?: (self: AseDialog, ...arg: unknown[]) => () => void;
  onrelease?: (self: AseDialog, ...arg: unknown[]) => () => void;
  visible?: boolean;
};

export const Slider = ({ id, label, min, max, value, onchange, onrelease, visible }: SliderAttributes): ComponentFormart => {
  return {
    tag: 'slider',
    attributes: {
      id,
      label,
      min,
      max,
      value,
      onchange,
      onrelease,
      visible,
    },
  };
};
