import { ComponentFormart, OnEvent} from './interface';

export type AppAttributes = {
  children: ComponentFormart[];
  title?: string;
  onclose?: OnEvent<boolean | void>;
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
