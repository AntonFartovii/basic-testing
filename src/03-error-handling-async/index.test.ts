// Uncomment the code below and write your tests
import {
  throwError,
  resolveValue,
  MyAwesomeError,
  throwCustomError,
  rejectCustomError,
} from './index';

describe('resolveValue', (): void => {
  test('should resolve provided value', async (): Promise<void> => {
    const value = await resolveValue('something');
    expect(value).toBe('something');
    const valueObj = await resolveValue({ a: 1 });
    expect(valueObj).toEqual({ a: 1 });
  });
});

describe('throwError', (): void => {
  test('should throw error with provided message', (): void => {
    const error: Error = new Error('Some error!');
    expect((): void => {
      throwError('Some error!');
    }).toThrow(error);
  });

  test('should throw error with default message if message is not provided', (): void => {
    const error: Error = new Error('Oops!');
    expect((): void => {
      throwError();
    }).toThrow(error);
  });
});

describe('throwCustomError', (): void => {
  test('should throw custom error', (): void => {
    expect((): void => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });

  test('should not throw error Opps!', (): void => {
    const error: Error = new Error('Oops!');
    expect((): void => {
      throwCustomError();
    }).not.toThrow(error);
  });
});

describe('rejectCustomError', (): void => {
  test('should reject custom error', () => {
    return expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
