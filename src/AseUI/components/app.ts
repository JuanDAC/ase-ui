import { ComponentFormart, OnEvent } from './interface';

export type AppAttributes = {
  children: ComponentFormart[];
  title?: string;
  onclose?: OnEvent<boolean | void>;
  position?: Position;
};

export type AppProps = {
  children: ComponentFormart[] | (ComponentFormart[] | ComponentFormart)[];
  title?: string;
  onclose?: OnEvent<boolean | void>;
  position?: Position;
};

export const App = ({ children, title, onclose, position }: AppProps): AppAttributes => {
  return {
    children: children.flat(20) as ComponentFormart[],
    title,
    onclose,
    position,
  };
};

export const Window = App;
export const Main = App;
