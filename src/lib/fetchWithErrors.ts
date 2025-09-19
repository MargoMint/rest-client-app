import { toast } from 'react-toastify';

export type SuccessResult<T = unknown> = {
  type: 'success';
  data: T;
};

export type HttpErrorResult = {
  type: 'http-error';
  status: number;
  message: string;
  body: unknown;
};

export type NetworkErrorResult = {
  type: 'network-error';
  message: string;
};

export type FetchResult<T = unknown> =
  | SuccessResult<T>
  | HttpErrorResult
  | NetworkErrorResult;

export async function fetchWithErrors<T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<FetchResult<T>> {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        type: 'http-error',
        status: res.status,
        message: res.statusText,
        body,
      };
    }

    const data: T = await res.json();
    return { type: 'success', data };
  } catch (err) {
    if (err instanceof Error) {
      toast.error(`Network or CORS error: ${err.message}`);
      return { type: 'network-error', message: err.message };
    }

    toast.error('Unexpected network error');
    return { type: 'network-error', message: 'Unknown error' };
  }
}
