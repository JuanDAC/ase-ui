import { ComponentFormart } from './interface';

type NewrowAttributes = {
  always?: boolean;
};

export const Newrow = ({ always = false }: NewrowAttributes = {}): ComponentFormart => {
  return {
    tag: 'newrow',
    attributes: {
      always,
    },
  };
};
