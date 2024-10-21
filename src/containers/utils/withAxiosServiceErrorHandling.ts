import { AxiosResponse } from 'axios';
import { addError } from '@store/error';
import { dispatch } from '@store/index';

const delay = <Response>(ms: number): Promise<Response> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const withAxiosServiceErrorHandling = <Response>(
  asyncFunc: () => Promise<AxiosResponse<Response>>,
  { requestAttempts = 0 }: { requestAttempts?: number } = { requestAttempts: 0 },
): Promise<Response> => {
  const callRequest = (): Promise<Response> =>
    asyncFunc()
      .then((response) => response.data)
      .catch((error: Error) => {
        if (requestAttempts > 0) {
          requestAttempts -= 1;
          return delay(500).then(callRequest);
        }
        dispatch(addError(error));
        throw new Error(error.message);
      });
  return callRequest();
};
