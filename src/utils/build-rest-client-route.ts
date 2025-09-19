import { base64url } from './base64';
import { HttpHeaders } from './headers';

function buildRestClientRoute(
  pathname: string,
  method: string,
  url: string,
  body: string,
  headers: HttpHeaders,
) {
  const encodedUrl = base64url(url);
  const encodedBody = body ? base64url(body) : '';

  const queryParams = new URLSearchParams(
    Object.entries(headers).map(([headerKey, headerValue]) => [
      headerKey,
      headerValue,
    ]),
  );

  return `${pathname}?method=${method}&url=${encodedUrl}&body=${encodedBody}&${queryParams.toString()}`;
}

export default buildRestClientRoute;
