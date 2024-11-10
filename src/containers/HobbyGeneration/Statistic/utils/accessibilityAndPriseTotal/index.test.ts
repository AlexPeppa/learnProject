import { Total, UserStatistic } from 'containers/HobbyGeneration/models';
import { accessibilityAndPriseTotal } from '.';

describe('accessibilityAndPriseTotal', () => {
  test('should return accessibilityTotal and priseTotal', () => {
    const users: UserStatistic[] = [
      { name: 'John', id: '1', gender: 'man', activity: 'swim', accessibility: 0.8, price: 5 },
      { name: 'Ann', id: '2', gender: 'woman', activity: 'run', accessibility: 0.9, price: 2 },
      { name: 'Alex', id: '3', gender: 'man', activity: 'sleep', accessibility: 0.4, price: 7 },
      { name: 'Alice', id: '4', gender: 'woman', activity: 'read', accessibility: 0.6, price: 6 },
    ];
    const result: Total = { accessibilityTotal: 2.7, priceTotal: 20 };
    expect(accessibilityAndPriseTotal(users)).toEqual(result);
  });
});
