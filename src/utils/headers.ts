export function withUpdatedHeaders(
  headers: Record<string, string>,
  updater: (draft: Record<string, string>) => void,
): Record<string, string> {
  const updated = { ...headers };
  updater(updated);
  return updated;
}

export function addHeader(
  headers: Record<string, string>,
): Record<string, string> {
  return withUpdatedHeaders(headers, (draft) => {
    draft[''] = '';
  });
}

export function updateHeader(
  headers: Record<string, string>,
  oldKey: string,
  newKey: string,
  newValue: string,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(headers).map(([headerKey, headerValue]) => [
      headerKey === oldKey ? newKey : headerKey,
      headerKey === oldKey ? newValue : headerValue,
    ]),
  );
}

export function deleteHeader(
  headers: Record<string, string>,
  keyToDelete: string,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(headers).filter(([headerKey]) => headerKey !== keyToDelete),
  );
}
