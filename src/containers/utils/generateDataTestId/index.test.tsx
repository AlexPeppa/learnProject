import { generateDataTestId } from '.';
import '@testing-library/jest-dom';

describe('generateTestId', () => {
  test('should return uniq id', () => {
    const entityPointer = 'user';
    const elementName = 'name';
    const suffix = '23';
    expect(generateDataTestId(entityPointer, elementName)).toEqual('testId_user_name');
    expect(generateDataTestId(entityPointer, elementName, suffix)).toEqual('testId_user_name_23');
  });
  test('should return uniq id with undefined', () => {
    const entityPointer = undefined;
    const elementName = undefined;
    const suffix = undefined;
    expect(generateDataTestId(entityPointer, elementName)).toEqual('testId_undefined_undefined');
    expect(generateDataTestId(entityPointer, elementName, suffix)).toEqual(
      'testId_undefined_undefined',
    );
  });
  test('should return uniq id  with spaces and special signs', () => {
    const entityPointer = 'Car';
    const elementName = '@#$%&_BMW';
    const suffix = '  5  ';
    expect(generateDataTestId(entityPointer, elementName)).toEqual('testId_Car_@#$%&_BMW');
    expect(generateDataTestId(entityPointer, elementName, suffix)).toEqual(
      'testId_Car_@#$%&_BMW_  5  ',
    );
  });
});
