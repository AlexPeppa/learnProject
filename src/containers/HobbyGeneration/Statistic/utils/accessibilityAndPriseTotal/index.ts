import { UserStatistic } from 'containers/HobbyGeneration/models';

export const accessibilityAndPriseTotal = (array: UserStatistic[]) =>
  array.reduce(
    (acc, { accessibility, price }) => ({
      priceTotal: acc.priceTotal + price,
      accessibilityTotal: acc.accessibilityTotal + accessibility,
    }),
    { accessibilityTotal: 0, priceTotal: 0 },
  );
