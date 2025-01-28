import ReactDOM from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

describe('index.tsx', () => {
  it('renders the app with all providers and AppRoutes', async () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

    await import('../main');

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootDiv);

    const mockRoot = (ReactDOM.createRoot as jest.Mock).mock.results[0].value;
    expect(mockRoot.render).toHaveBeenCalledTimes(1);

    document.body.removeChild(rootDiv);
  });
});
