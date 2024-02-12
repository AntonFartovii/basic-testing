// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';
import { join } from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const ms = 1000;
    const timer = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, ms);
    jest.advanceTimersByTime(ms);
    expect(timer).toBeCalledTimes(1);
    expect(timer).toHaveBeenLastCalledWith(expect.any(Function), ms);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const ms = 1000;
    doStuffByTimeout(callback, ms);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(ms);
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
    const callback = jest.fn();
    const ms = 1000;
    const timer = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, ms);
    jest.advanceTimersByTime(ms);
    expect(timer).toBeCalledTimes(1);
    expect(timer).toHaveBeenLastCalledWith(expect.any(Function), ms);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const ms = 1000;
    doStuffByInterval(callback, ms);
    jest.advanceTimersByTime(5000);
    expect(callback).toBeCalledTimes(5);
  });
});

jest.mock('fs');
jest.mock('fs/promises');

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('file.txt');
    expect(join).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('file.txt')).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('Go!');
    expect(await readFileAsynchronously('file.txt')).toBe('Go!');
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('Go!!');
    expect(await readFileAsynchronously('file.txt')).not.toBe('Go!');
  });
});
