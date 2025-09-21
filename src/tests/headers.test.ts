import {
  HeaderItem,
  addHeaderItem,
  updateHeaderItem,
  deleteHeaderItem,
  headersArrayToRecord,
} from '@/utils/headers';

describe('addHeaderItem', () => {
  test('adds a new header item with empty key and value', () => {
    const items: HeaderItem[] = [];
    const result = addHeaderItem(items);

    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('');
    expect(result[0].value).toBe('');
    expect(result[0].id).toMatch(/^header_/);
  });
});

describe('updateHeaderItem', () => {
  test('updates item by id', () => {
    const items: HeaderItem[] = [{ id: '1', key: 'a', value: 'b' }];
    const result = updateHeaderItem(items, '1', 'newKey', 'newValue');

    expect(result[0].key).toBe('newKey');
    expect(result[0].value).toBe('newValue');
  });

  test('does not change other items', () => {
    const items: HeaderItem[] = [
      { id: '1', key: 'a', value: 'b' },
      { id: '2', key: 'c', value: 'd' },
    ];
    const result = updateHeaderItem(items, '1', 'x', 'y');

    expect(result[1]).toEqual({ id: '2', key: 'c', value: 'd' });
  });
});

describe('deleteHeaderItem', () => {
  test('removes item by id', () => {
    const items: HeaderItem[] = [
      { id: '1', key: 'a', value: 'b' },
      { id: '2', key: 'c', value: 'd' },
    ];
    const result = deleteHeaderItem(items, '1');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });
});

describe('headersArrayToRecord', () => {
  test('converts array to record', () => {
    const items: HeaderItem[] = [
      { id: '1', key: 'Content-Type', value: 'application/json' },
      { id: '2', key: 'Authorization', value: 'Bearer token' },
    ];

    const result = headersArrayToRecord(items);
    expect(result).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    });
  });

  test('ignores items with empty key', () => {
    const items: HeaderItem[] = [
      { id: '1', key: '', value: 'test' },
      { id: '2', key: 'X-Test', value: '123' },
    ];

    const result = headersArrayToRecord(items);
    expect(result).toEqual({ 'X-Test': '123' });
  });
});
