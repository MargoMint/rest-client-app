export type HttpHeaders = { [headerName: string]: string };

export function withUpdatedHeaders(
  headers: HttpHeaders,
  updater: (draft: HttpHeaders) => void,
): HttpHeaders {
  const updated = { ...headers };
  updater(updated);
  return updated;
}

export function addHeader(headers: HttpHeaders): HttpHeaders {
  return withUpdatedHeaders(headers, (draft) => {
    draft[''] = '';
  });
}

export function updateHeader(
  headers: HttpHeaders,
  oldKey: string,
  newKey: string,
  newValue: string,
): HttpHeaders {
  return Object.fromEntries(
    Object.entries(headers).map(([headerKey, headerValue]) => [
      headerKey === oldKey ? newKey : headerKey,
      headerKey === oldKey ? newValue : headerValue,
    ]),
  );
}

export function deleteHeader(
  headers: HttpHeaders,
  keyToDelete: string,
): HttpHeaders {
  return Object.fromEntries(
    Object.entries(headers).filter(([headerKey]) => headerKey !== keyToDelete),
  );
}
