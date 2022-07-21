import { ComponentFormart, OnEvent } from './interface';

type NumberAttributes = {
  id: string;
  label?: string;
  text?: string;
  decimals?: number;
  visible?: boolean;
  onchange?: OnEvent;
};

export const Number = ({ id, label, text, decimals, visible, onchange }: NumberAttributes): ComponentFormart => {
  return {
    tag: 'number',
    attributes: {
      id,
      label,
      text,
      decimals,
      visible,
      onchange,
    },
  };
};
