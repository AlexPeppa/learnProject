export const generateDataTestId = (
  entityPointer: string,
  elementName: string,
  suffix?: string,
): string => `testId_${entityPointer}_${elementName}${suffix ? `_${suffix}` : ''}`;
