import { deleteDraftCarModel } from '.';

describe('deleteDraftCarModel', () => {
  test('should return filter Models', () => {
    const models = ['bmw', 'audi', 'mercedes'];
    expect(deleteDraftCarModel(models, 'audi')).toEqual(['bmw', 'mercedes']);
    expect(deleteDraftCarModel(['audi'], 'audi')).toEqual([]);
    expect(deleteDraftCarModel([], 'audi')).toEqual([]);
    expect(deleteDraftCarModel(models, '')).toEqual(models);
    expect(deleteDraftCarModel(models, 'lada')).toEqual(models);
  });
});
