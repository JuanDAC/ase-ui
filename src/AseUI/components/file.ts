import { ComponentFormart } from './interface';

type File = {
  id: string;
  label?: string;
  visible?: boolean;
  title?: string;
  open?: boolean;
  save?: boolean;
  filename?: string | string[];
  filetype?: string[];
  onchange?: (file: File) => void;
};

export const File = ({ id, label, visible, title, open, save, filename, filetype, onchange }: File): ComponentFormart => {
  return {
    tag: 'file',
    attributes: {
      id,
      label,
      visible,
      title,
      open,
      save,
      filename,
      filetype,
      onchange,
    },
  };
};
