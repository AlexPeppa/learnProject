import { generateDefaultPoints } from '.';

describe('generateDefaultPoints', () => {
  test('should return value and label', () => {
    const marks = [
      { label: '0', value: 0 },
      { label: '0.1', value: 10 },
      { label: '0.2', value: 20 },
      { label: '0.3', value: 30 },
      { label: '0.4', value: 40 },
      { label: '0.5', value: 50 },
      { label: '0.6', value: 60 },
      { label: '0.7', value: 70 },
      { label: '0.8', value: 80 },
      { label: '0.9', value: 90 },
      { label: '1', value: 100 },
    ];
    expect(generateDefaultPoints()).toEqual(marks);
  });
});
