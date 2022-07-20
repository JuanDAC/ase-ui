import { AseDialog } from '../interfece';
import { ComponentFormart } from './interface';

type ButtonAttributes = {
  id: string;
  text: string;
  focus?: boolean;
  visible?: boolean;
  label?: string;
  selected?: boolean;
  onclick?: (self: AseDialog, ...arg: unknown[]) => () => void;
};

export const Button = ({ id, text, selected, focus, visible, label, onclick }: ButtonAttributes): ComponentFormart => {
  return {
    tag: 'button',
    attributes: {
      id,
      text,
      label,
      focus,
      visible,
      onclick,
      selected,
    },
  };
};
