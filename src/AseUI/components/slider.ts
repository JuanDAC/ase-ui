import { ComponentFormart } from './interface';

type SliderAttributes = {
  id: string;
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  onchange?: (value: number) => void;
  onrelease?: (value: number) => void;
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
