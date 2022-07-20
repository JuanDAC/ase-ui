import { AseDialog } from '../interfece';
import { ComponentFormart } from './interface';

type entryAttributes = {
  id: string;
  label?: string;
  text?: string;
  focus?: boolean;
  visible?: boolean;
  onchange?: (self: AseDialog, ...arg: unknown[]) => () => void;
};

export const Entry = ({ id, label, text, focus, visible, onchange }: entryAttributes): ComponentFormart => {
  return {
    tag: 'entry',
    attributes: {
      id,
      label,
      text,
      focus,
      visible,
      onchange,
    },
  };
};
