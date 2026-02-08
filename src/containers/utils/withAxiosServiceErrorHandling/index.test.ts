import axios, { AxiosHeaders } from 'axios';
import { withAxiosServiceErrorHandling } from '.';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('withAxiosServiceErrorHandling', () => {
  const headers = new AxiosHeaders();
  interface Result {
    data: number[];
    status: number;
    statusText: string;
    headers: { 'X-Requested-With': string };
    request: string;
    config: {
      headers: AxiosHeaders;
    };
  }

  test('withAxiosServiceErrorHandling should work _ 1', async () => {
    const list: number[] = [1, 2, 3];
    const result: Result = {
      data: list,
      status: 200,
      statusText: 'string',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      request: '',
      config: {
        headers,
      },
    };
    const response = { data: list };
    const getInfo = (): Promise<Result> => Promise.resolve(result);

    const asyncFn = async () => {
      mockedAxios.get.mockResolvedValue(response);
      const res = await getInfo();
      return res;
    };

    await expect(withAxiosServiceErrorHandling(asyncFn, { requestAttempts: 3 })).resolves.toEqual(
      list,
    );
  });

  test('withAxiosServiceErrorHandling should return error', async () => {
    const asyncFnError = async (): Promise<Result> => Promise.reject(Error.name);
    await expect(
      withAxiosServiceErrorHandling(asyncFnError, { requestAttempts: 7 }),
    ).rejects.toThrow(Error);
  });

  test('CalledTimes of asyncFn', async () => {
    const asyncMockFn = jest
      .fn()
      .mockRejectedValueOnce(Error)
      .mockRejectedValueOnce(Error)
      .mockRejectedValueOnce(Error)
      .mockResolvedValueOnce({ data: 1 });

    await withAxiosServiceErrorHandling(asyncMockFn, { requestAttempts: 3 });
    expect(asyncMockFn).toHaveBeenCalledTimes(4);
  });
});
