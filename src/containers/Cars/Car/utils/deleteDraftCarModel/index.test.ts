import { deleteDraftCarModel } from '.';

describe('deleteDraftCarModel', () => {
  const models = ['bmw', 'audi', 'mercedes'];
  test('should return filter Models', () => {
    expect(deleteDraftCarModel(models, 'audi')).toEqual(['bmw', 'mercedes']);
  });
  test('should return empty array without error', () => {
    expect(deleteDraftCarModel(['audi'], 'audi')).toEqual([]);
  });
  test('delete model from empty array without error', () => {
    expect(deleteDraftCarModel([], 'audi')).toEqual([]);
  });
  test('delete empty model from models without error', () => {
    expect(deleteDraftCarModel(models, '')).toEqual(models);
  });
  test('delete no exist model without error', () => {
    expect(deleteDraftCarModel(models, 'lada')).toEqual(models);
  });
});
