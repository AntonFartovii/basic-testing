// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 1, action: Action.Subtract, expected: 3 },
  { a: 30, b: 32, action: Action.Subtract, expected: -2 },
  { a: -1, b: 0, action: Action.Multiply, expected: -0 },
  { a: 0, b: 32, action: Action.Multiply, expected: 0 },
  { a: 3, b: 32, action: Action.Multiply, expected: 96 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 4, b: 4, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 30, b: 2, action: Action.Exponentiate, expected: 900 },
  { a: 30, b: 2, action: 'unknown', expected: null },
  { a: undefined, b: 2, action: Action.Subtract, expected: null },
  { a: 30, b: '2', action: Action.Multiply, expected: null },
];

const testCases2 = [
  { a: 1, b: 2, action: Action.Add, expected: 4 },
  { a: 2, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Add, expected: 6 },
  { a: 3, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 1, action: Action.Subtract, expected: 4 },
  { a: 30, b: 32, action: Action.Subtract, expected: -1 },
  { a: -1, b: 0, action: Action.Multiply, expected: 1 },
  { a: 0, b: 32, action: Action.Multiply, expected: 1 },
  { a: 3, b: 32, action: Action.Multiply, expected: 97 },
  { a: 9, b: 3, action: Action.Divide, expected: 4 },
  { a: 10, b: 2, action: Action.Divide, expected: 6 },
  { a: 4, b: 4, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 17 },
  { a: 1, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 30, b: 2, action: Action.Exponentiate, expected: 901 },
];
describe.each(testCases)('toBe', ({ a, b, action, expected }) => {
  test('toBe', () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
describe.each(testCases2)('toBeLessThan', ({ a, b, action, expected }) => {
  expected &&
    test('toBeLessThan', () => {
      expect(simpleCalculator({ a, b, action })).toBeLessThan(expected);
    });
});
