export const arrayToMap = <T extends object>(array: T[], keyName: keyof T) =>
  array.reduce<Record<string | number, T>>((dictionary, next) => {
    const key = next[keyName] as string | number;
    dictionary[key] = next;
    return dictionary;
  }, {});
