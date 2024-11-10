export const deleteDraftCarModel = (array: string[], model: string) =>
  array.filter((mark) => mark !== model);
