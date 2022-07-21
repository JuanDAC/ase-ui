import { ComponentFormart, OnEvent } from './interface';

type RadioArguments = {
  id: string;
  label?: string;
  text?: string;
  selected?: boolean;
  visible?: boolean;
  onclick?: OnEvent;
};

export const Radio = ({ id, label, text, selected, visible, onclick }: RadioArguments): ComponentFormart => {
  return {
    tag: 'radio',
    attributes: {
      id,
      label,
      text,
      visible,
      onclick,
      selected,
    },
  };
};
