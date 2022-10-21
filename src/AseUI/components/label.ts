import { ComponentFormart } from './interface';

type LabelAttributes = {
  id: string;
  label?: string;
  text?: string;
  visible?: boolean;
};

export const Label = ({ id, label, text, visible }: LabelAttributes): ComponentFormart => {
  return {
    tag: 'label',
    attributes: {
      id,
      label,
      text,
      visible,
    },
  };
};

export const Text = Label;
