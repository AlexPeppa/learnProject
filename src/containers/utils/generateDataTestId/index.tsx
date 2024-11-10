export const generateDataTestId = (
  entityPointer: string,
  elementName: string,
  suffix: string = '1',
): string => `testId_${entityPointer}_${elementName}_${suffix}`;
