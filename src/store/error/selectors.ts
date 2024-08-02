import { AppStore } from "src/store";

export const errorSelectors = {
  getErrors: (state: AppStore) => state.error.allErrors,
};
