import RestClientLayout from '@/components/rest-client/rest-client-layout';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from './test-utils/render-with-intl';
import { HttpStatus } from '@/constants/http-status';
import BodyEditor from '@/components/rest-client/body-editor';
import { Variable } from '@/app/[locale]/variables/types';

Object.defineProperty(Range.prototype, 'getClientRects', {
  value: () => [],
});

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock('next/navigation', () => {
  return {
    useRouter: () => mockRouter,
    usePathname: () => '/rest-client',
  };
});

describe('RestClientLayout', () => {
  beforeAll(() => {
    HTMLElement.prototype.hasPointerCapture = () => false;
    HTMLElement.prototype.scrollIntoView = () => {};
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('renders basic UI elements', () => {
    renderWithIntl(<RestClientLayout />);

    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter request url/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /header/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /body/i })).toBeInTheDocument();

    expect(screen.getByTestId('response-section')).toBeInTheDocument();
  });

  test('allows typing in URL input', async () => {
    renderWithIntl(<RestClientLayout />);
    const input = screen.getByPlaceholderText(/enter request url/i);

    await userEvent.clear(input);
    await userEvent.type(input, 'https://api.example.com');

    expect(input).toHaveValue('https://api.example.com');
  });

  // test('allows selecting HTTP method', async () => {
  //   renderWithIntl(<RestClientLayout />);
  //   const combobox = screen.getByRole('combobox');
  //   await userEvent.click(combobox);

  //   const postOption = await screen.findByText('POST');
  //   await userEvent.click(postOption);

  //   expect(screen.getByText('POST')).toBeInTheDocument();
  // });

  test('shows "No response yet" before request', () => {
    renderWithIntl(<RestClientLayout />);
    expect(screen.getByText(/no response yet/i)).toBeInTheDocument();
  });

  test('updates response after successful fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: HttpStatus.OK,
      json: async () => ({ message: 'ok' }),
    });

    renderWithIntl(<RestClientLayout />);
    const input = screen.getByPlaceholderText(/enter request url/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await userEvent.type(input, 'https://api.example.com');
    await userEvent.click(sendButton);

    const response = await screen.findByTestId('response-section');
    expect(response).toHaveTextContent('200');
    expect(response).toHaveTextContent('ok');

    const encodedUrl = btoa('https://api.example.com').replace(/=+$/, '');
    expect(mockRouter.push).toHaveBeenCalledWith(
      expect.stringContaining(
        `/rest-client?method=GET&url=${encodedUrl}&body=`,
      ),
    );
  });
});

describe('BodyEditor', () => {
  const mockOnChange = jest.fn();
  const mockOnModeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders BodyEditor with initial mode and value', () => {
    const mockVariables: Variable[] = [
      { name: 'token', value: 'abc123', description: '' },
      { name: 'userId', value: '42', description: '' },
    ];
    renderWithIntl(
      <BodyEditor
        value="test content"
        onChange={mockOnChange}
        mode="json"
        onModeChange={mockOnModeChange}
        variables={mockVariables}
      />,
    );

    expect(screen.getByText('test content')).toBeInTheDocument();
    expect(screen.getByText('JSON')).toBeInTheDocument();
  });

  test('switches between JSON and text modes', async () => {
    const mockVariables: Variable[] = [
      { name: 'token', value: 'abc123', description: '' },
      { name: 'userId', value: '42', description: '' },
    ];
    renderWithIntl(
      <BodyEditor
        value=""
        onChange={mockOnChange}
        mode="json"
        onModeChange={mockOnModeChange}
        variables={mockVariables}
      />,
    );

    const selectTrigger = screen.getByRole('combobox');
    await userEvent.click(selectTrigger);

    const textOption = screen.getByText('Text');
    await userEvent.click(textOption);

    expect(mockOnModeChange).toHaveBeenCalledWith('text');
  });

  test('prettifies JSON content when prettify button is clicked', async () => {
    const uglyJson = '{"name":"user","age":100,"active":true}';
    const prettyJson = `{
  "name": "user",
  "age": 100,
  "active": true
}`;
    const mockVariables: Variable[] = [
      { name: 'token', value: 'abc123', description: '' },
      { name: 'userId', value: '42', description: '' },
    ];

    renderWithIntl(
      <BodyEditor
        value={uglyJson}
        onChange={mockOnChange}
        mode="json"
        onModeChange={mockOnModeChange}
        variables={mockVariables}
      />,
    );

    const prettifyButton = screen.getByRole('button', { name: /code-format/i });
    await userEvent.click(prettifyButton);

    expect(mockOnChange).toHaveBeenCalledWith(prettyJson);
  });

  test('shows prettify button only in JSON mode', () => {
    const mockVariables: Variable[] = [
      { name: 'token', value: 'abc123', description: '' },
      { name: 'userId', value: '42', description: '' },
    ];
    renderWithIntl(
      <BodyEditor
        value=""
        onChange={mockOnChange}
        mode="text"
        onModeChange={mockOnModeChange}
        variables={mockVariables}
      />,
    );

    expect(
      screen.queryByRole('button', { name: /code-format/i }),
    ).not.toBeInTheDocument();
  });
});
