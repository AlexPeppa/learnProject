export const deleteDraftCarModel = (models: string[], model: string) =>
  models.filter((mark) => mark !== model);
