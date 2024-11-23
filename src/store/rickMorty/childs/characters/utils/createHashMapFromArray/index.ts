export const arrayToMap = <T>(array: T[], keyName: string) =>
  array.reduce<Record<number, T>>((dictionary, next) => {
    dictionary[next[keyName]] = next;
    return dictionary;
  }, {});
