import { ComponentFormart, OnEvent } from './interface';

type ColorAttributes = {
  id: string;
  label?: string;
  color?: Color;
  visible?: boolean;
  onchange?: OnEvent<void, Color>;
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
