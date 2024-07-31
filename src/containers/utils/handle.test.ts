import { AxiosHeaders } from "axios";
import axios from "axios";
import { withAxiosServiceErrorHandling } from "./handle";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("withAxiosServiceErrorHandling", () => {
  const headers = new AxiosHeaders();
  interface Result {
    data: number[];
    status: number;
    statusText: string;
    headers: { "X-Requested-With": string };
    request: string;
    config: {
      headers: AxiosHeaders;
    };
  }

  test("withAxiosServiceErrorHandling should work _ 1", () => {
    let list: number[] = [1, 2, 3];
    const result: Result = {
      data: list,
      status: 200,
      statusText: "string",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      request: "",
      config: {
        headers: headers,
      },
    };
    let response = { data: list };
    const getInfo = (): Promise<Result> => {
      return Promise.resolve(result);
    };

    const asyncFn = async () => {
      mockedAxios.get.mockResolvedValue(response);
      const result = await getInfo();
      console.log(result.data);
      return result;
    };

    expect(withAxiosServiceErrorHandling(asyncFn, { requestAttempts: 3 })).resolves.toEqual(list);
  });

  test("withAxiosServiceErrorHandling should return error", () => {
    const asyncFnError = async <Result>(): Promise<Result> => {
      return await Promise.reject("error");
    };
    expect(withAxiosServiceErrorHandling(asyncFnError, { requestAttempts: 7 })).rejects.toThrow(
      Error
    );
  });

  test("CalledTimes of asyncFn", async () => {
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
