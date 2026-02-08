import { RenderOptions, render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AppStore, RootStore, setupStore } from '../../../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<AppStore>;
  store?: RootStore;
}
export const renderWithProvider = (
  component: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const { preloadedState = {}, store = setupStore(preloadedState) } = extendedRenderOptions;
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );
  return {
    store,
    ...render(component, { wrapper: Wrapper }),
  };
};
