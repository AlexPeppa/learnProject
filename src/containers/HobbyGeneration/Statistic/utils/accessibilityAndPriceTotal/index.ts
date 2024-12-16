import { Total, UserStatistic } from 'containers/HobbyGeneration/models';

export const accessibilityAndPriceTotal = (users: UserStatistic[]) =>
  users.reduce<Total>(
    (acc, { accessibility, price }) => ({
      priceTotal: acc.priceTotal + (price || 0),
      accessibilityTotal: acc.accessibilityTotal + (accessibility || 0),
    }),
    { accessibilityTotal: 0, priceTotal: 0 },
  );
