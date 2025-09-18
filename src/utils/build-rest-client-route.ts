import { base64url } from './base64';

function buildRestClientRoute(
  pathname: string,
  method: string,
  url: string,
  body: string,
  headers: Record<string, string>,
) {
  const encodedUrl = base64url(url);
  const encodedBody = body ? base64url(body) : '';

  const queryParams = new URLSearchParams(
    Object.entries(headers).map(([k, v]) => [k, v]),
  );

  return `${pathname}?method=${method}&url=${encodedUrl}&body=${encodedBody}&${queryParams.toString()}`;
}

export default buildRestClientRoute;
