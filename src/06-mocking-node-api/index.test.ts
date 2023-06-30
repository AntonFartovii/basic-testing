// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { doStuffByInterval } from './index';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timer = jest.spyOn(global, 'setTimeout');
    doStuffByInterval(callback, 1);
    jest.runAllTimers();
    expect(timer).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
