import { HttpHeaders } from './headers';

async function sendRequest(
  url: string,
  method: string,
  headers: HttpHeaders,
  body: string,
) {
  const options: RequestInit = {
    method,
    headers: {
      ...headers,
    },
  };

  if (method !== 'GET' && method !== 'DELETE' && body) {
    options.body = body;
  }

  const response = await fetch(url, options);

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = await response.text();
  }

  return { status: response.status, data };
}

export default sendRequest;
