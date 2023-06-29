// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(
      simpleCalculator({ a: 0, b: 0, action: Action.Add }),
    ).toBeGreaterThan(-1);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBeLessThan(
      5,
    );
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Subtract })).toBe(1);
    expect(
      simpleCalculator({ a: 3, b: 4, action: Action.Subtract }),
    ).toBeLessThan(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Multiply })).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: 'something' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'i', b: 2, action: Action.Divide })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 45, b: '', action: Action.Add })).toBe(null);
  });
});
