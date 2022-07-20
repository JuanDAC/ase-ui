import { ComponentFormart } from './interface';

export type AppAttributes = {
  children: ComponentFormart[];
  title?: string;
  onclose?: () => void;
  position?: Position;
};

export const App = ({ children, title, onclose, position }: AppAttributes): AppAttributes => {
  return {
    children,
    title,
    onclose,
    position,
  };
};
