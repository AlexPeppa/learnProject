import { AppStore } from 'store';

export const errorSelectors = {
  getFirstError: (state: AppStore) => state.error.allErrors[0],
};
