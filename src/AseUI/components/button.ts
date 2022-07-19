import { ComponentFormart } from './interface';

type ButtonAttributes = {
  id: string;
  text: string;
  focus?: boolean;
  visible?: boolean;
  label?: string;
  selected?: boolean;
  onClick?: () => void;
};

export const Button = ({ id, text, selected, focus, visible, label, onClick }: ButtonAttributes): ComponentFormart => {
  return {
    tag: 'button',
    attributes: {
      id,
      text,
      label,
      focus,
      visible,
      onClick,
      selected,
    },
  };
};
