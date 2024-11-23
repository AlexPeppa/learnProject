import { Total, UserStatistic } from 'containers/HobbyGeneration/models';
import { accessibilityAndPriseTotal } from '.';

describe('accessibilityAndPriseTotal', () => {
  test('should return accessibilityTotal and priseTotal base case', () => {
    const users: UserStatistic[] = [
      { name: 'John', id: '1', gender: 'man', activity: 'swim', accessibility: 0.8, price: 5 },
      { name: 'Ann', id: '2', gender: 'woman', activity: 'run', accessibility: 0.9, price: 2 },
      { name: 'Alex', id: '3', gender: 'man', activity: 'sleep', accessibility: 0.4, price: 7 },
      { name: 'Alice', id: '4', gender: 'woman', activity: 'read', accessibility: 0.6, price: 6 },
    ];
    const result: Total = { accessibilityTotal: 2.7, priceTotal: 20 };
    expect(accessibilityAndPriseTotal(users)).toEqual(result);
  });
  test('should return accessibilityTotal and priseTotal with  undefined information', () => {
    const users: UserStatistic[] = [
      { name: 'John', id: '1', gender: 'man', activity: 'swim', accessibility: 100, price: 1 },
      { name: 'Ann', id: '2', gender: 'woman', activity: 'run', accessibility: 0.9, price: 5 },
      {
        name: 'Alex',
        id: '3',
        gender: 'man',
        activity: 'sleep',
        accessibility: undefined,
        price: undefined,
      },
      {
        name: 'Alice',
        id: '4',
        gender: 'woman',
        activity: 'read',
        accessibility: 0.6,
        price: 7,
      },
      { name: 'Steve', id: '5', gender: 'man', activity: 'pool', accessibility: 0, price: 0 },
    ];
    const result: Total = { accessibilityTotal: 101.5, priceTotal: 13 };
    expect(accessibilityAndPriseTotal(users)).toEqual(result);
  });
});
