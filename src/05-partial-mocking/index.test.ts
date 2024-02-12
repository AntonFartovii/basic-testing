// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', (): void => {
  afterAll((): void => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', (): void => {
    const spyConsoleLog = jest.spyOn(global.console, 'log');
    mockOne();
    expect(spyConsoleLog).not.toBeCalled();
    mockTwo();
    expect(spyConsoleLog).not.toBeCalled();
    mockThree();
    expect(spyConsoleLog).not.toBeCalled();
  });

  test('unmockedFunction should log into console', (): void => {
    const spyConsoleLog = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(spyConsoleLog).toBeCalled();
  });
});
