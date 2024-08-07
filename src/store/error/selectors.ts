import { AppStore } from "src/store";

export const errorSelectors = {
  getFirstError: (state: AppStore) => state.error.allErrors[0],
};
