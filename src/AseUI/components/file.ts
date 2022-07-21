import { ComponentFormart, OnEvent } from './interface';

type FileAttributes = {
  id: string;
  label?: string;
  visible?: boolean;
  title?: string;
  open?: boolean;
  save?: boolean;
  filename?: string | string[];
  filetype?: string[];
  onchange?: OnEvent;
};

export const File = ({ id, label, visible, title, open, save, filename, filetype, onchange }: FileAttributes): ComponentFormart => {
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
