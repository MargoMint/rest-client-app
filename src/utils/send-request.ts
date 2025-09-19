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
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (method !== 'GET' && method !== 'DELETE' && body) {
    options.body = body;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  return { status: response.status, data };
}

export default sendRequest;
