import { ComponentFormart } from './interface';

type SeparatorAttributes = { text?: string; id: string; visible?: boolean };

export const Separator = ({ text, id, visible }: SeparatorAttributes): ComponentFormart => {
  return {
    tag: 'separator',
    attributes: {
      text,
      id,
      visible,
    },
  };
};
