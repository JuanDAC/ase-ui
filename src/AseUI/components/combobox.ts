import { ComponentFormart, OnEvent } from './interface';

type ComboboxAttributes = {
  id: string;
  focus?: boolean;
  visible?: boolean;
  option?: string;
  options?: string[];
  label?: string;
  onchange?: OnEvent<void, string>;
};

export const Combobox = ({ id, option, options, focus, visible, label, onchange }: ComboboxAttributes): ComponentFormart => {
  return {
    tag: 'combobox',
    attributes: {
      id,
      focus,
      visible,
      option,
      options,
      label,
      onchange,
    },
  };
};

export const Select = Combobox;
