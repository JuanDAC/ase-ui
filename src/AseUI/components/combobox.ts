import { ComponentFormart } from './interface';

type ComboboxAttributes = {
  id: string;
  focus?: boolean;
  visible?: boolean;
  option?: string;
  options?: string[];
  label?: string;
  onChange?: (value: string) => void;
};

export const Combobox = ({ id, option, options, focus, visible, label, onChange }: ComboboxAttributes): ComponentFormart => {
  return {
    tag: 'combobox',
    attributes: {
      id,
      focus,
      visible,
      option,
      options,
      label,
      onChange,
    },
  };
};
