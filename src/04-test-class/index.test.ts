// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', (): void => {
  let bankAccount: BankAccount;
  const initialBalance = 600;
  beforeEach((): void => {
    bankAccount = getBankAccount(initialBalance);
  });
  test('should create account with initial balance', (): void => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
    expect(bankAccount.getBalance()).not.toBe(null);
    expect(bankAccount.getBalance()).toBeLessThan(601);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', (): void => {
    expect((): void => {
      bankAccount.withdraw(initialBalance + 1);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', (): void => {
    const toAccount: BankAccount = getBankAccount(200);
    expect((): void => {
      bankAccount.transfer(1000, toAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', (): void => {
    expect((): void => {
      bankAccount.transfer(500, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', (): void => {
    const deposit = 400;
    bankAccount = bankAccount.deposit(deposit);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    const balance = bankAccount.getBalance();
    expect(balance).toBe(initialBalance + deposit);
    expect(balance).toBeLessThan(initialBalance + deposit + 1);
    expect(balance).toBeGreaterThan(initialBalance + deposit - 1);
  });

  test('should withdraw money', (): void => {
    const sum = 400;
    bankAccount = bankAccount.withdraw(sum);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    const balance = bankAccount.getBalance();
    expect(balance).toBe(initialBalance - sum);
    expect(balance).toBeLessThan(initialBalance - sum + 1);
    expect(balance).toBeGreaterThan(initialBalance - sum - 1);
  });

  test('should transfer money', (): void => {
    const toAccount: BankAccount = getBankAccount(200);
    bankAccount = bankAccount.transfer(300, toAccount);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    const balance = bankAccount.getBalance();
    expect(balance).toBe(initialBalance - 300);
  });

  test('fetchBalance should return number in case if request did not failed', async (): Promise<void> => {
    lodash.random = jest.fn().mockImplementationOnce((): number => 10);
    expect(await bankAccount.fetchBalance()).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async (): Promise<void> => {
    const oldBalance: number = bankAccount.getBalance();
    bankAccount.fetchBalance = jest
      .fn()
      .mockImplementationOnce((): number => 234234);
    await bankAccount.synchronizeBalance();
    const newBalance: number = bankAccount.getBalance();
    expect(bankAccount.fetchBalance).toBeCalledTimes(1);
    expect(newBalance).not.toBe(oldBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async (): Promise<void> => {
    bankAccount.fetchBalance = jest.fn().mockImplementationOnce(() => null);
    return expect(async (): Promise<void> => {
      await bankAccount.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
