import { AseDialog } from '../interfece';
import { ComponentFormart } from './interface';

type ComboboxAttributes = {
  id: string;
  focus?: boolean;
  visible?: boolean;
  option?: string;
  options?: string[];
  label?: string;
  onchange?: (self: AseDialog, ...arg: unknown[]) => () => void;
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
