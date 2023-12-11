'use-client';

import { Provider } from 'react-redux';
import { store } from '.';

interface Props {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: Props) => (
  <Provider store={store}>{children}</Provider>
);
