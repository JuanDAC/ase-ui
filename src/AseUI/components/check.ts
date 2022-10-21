import { ComponentFormart, OnEvent } from './interface';

type CheckAttributes = {
  id: string;
  text?: string;
  visible?: boolean;
  label?: string;
  selected?: boolean;
  onclick?: OnEvent<void, boolean>;
};

export const Check = ({ id, text, selected, visible, label, onclick }: CheckAttributes): ComponentFormart => {
  return {
    tag: 'check',
    attributes: {
      id,
      text,
      label,
      visible,
      onclick,
      selected,
    },
  };
};

export const Checkbox = Check;
