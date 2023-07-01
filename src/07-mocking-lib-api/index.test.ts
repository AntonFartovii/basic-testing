import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  get: jest.fn(),
  create() {
    return {
      get: this.get.mockResolvedValueOnce({ data: 'test' }),
    };
  },
}));

jest.mock('lodash', () => {
  const module = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    ...module,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const cs = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/users');
    expect(axios.create).toHaveBeenCalled();
    expect(cs).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.spyOn(axios, 'get');
    await throttledGetDataFromApi('/users');
    expect(mockedGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: 'response data' });
    const response = await throttledGetDataFromApi('/users');
    expect(response).toEqual('response data');
  });
});
