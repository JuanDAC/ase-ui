import { ComponentFormart } from './interface';

type SeparatorAttributes = { text: string; id: string };

export const Separator = ({ text, id }: SeparatorAttributes): ComponentFormart => {
  return {
    tag: 'separator',
    attributes: {
      text,
      id,
    },
  };
};
