import { render, screen } from '@testing-library/react';
import { RouteWrapper } from '../RouteWrapper';

const MockLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="mock-layout">{children}</div>
);

const MockElement: React.FC = () => (
  <div data-testid="mock-element">Mock Element</div>
);

describe('RouteWrapper', () => {
  it('renders the layout and element correctly', () => {
    render(<RouteWrapper layout={MockLayout} element={MockElement} />);

    const layout = screen.getByTestId('mock-layout');
    expect(layout).toBeInTheDocument();

    const element = screen.getByTestId('mock-element');
    expect(element).toBeInTheDocument();
  });

  it('renders correctly with another layout and element', () => {
    const AnotherLayout: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => <div data-testid="another-layout">{children}</div>;
    const AnotherElement: React.FC = () => (
      <div data-testid="another-element">Another Element</div>
    );

    render(<RouteWrapper layout={AnotherLayout} element={AnotherElement} />);

    const layout = screen.getByTestId('another-layout');
    expect(layout).toBeInTheDocument();

    const element = screen.getByTestId('another-element');
    expect(element).toBeInTheDocument();
  });
});
