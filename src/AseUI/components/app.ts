import { ComponentFormart } from './interface';

type AppAttributes = {
  children: ComponentFormart[];
};

export const App = ({ children }: AppAttributes): ComponentFormart[] => children;
