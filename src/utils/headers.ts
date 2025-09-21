export type HttpHeaders = { [headerName: string]: string };

export type HeaderItem = {
  id: string;
  key: string;
  value: string;
};

function genId() {
  return `header_${crypto.randomUUID()}`;
}

export function addHeaderItem(items: HeaderItem[]): HeaderItem[] {
  return [...items, { id: genId(), key: '', value: '' }];
}

export function updateHeaderItem(
  items: HeaderItem[],
  id: string,
  newKey: string,
  newValue: string,
): HeaderItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, key: newKey, value: newValue } : item,
  );
}

export function deleteHeaderItem(
  items: HeaderItem[],
  id: string,
): HeaderItem[] {
  return items.filter((item) => item.id !== id);
}

export function headersArrayToRecord(items: HeaderItem[]): HttpHeaders {
  return Object.fromEntries(
    items
      .filter((item) => item.key.trim() !== '')
      .map((item) => [item.key.trim(), item.value]),
  );
}
