import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as chakra from '@chakra-ui/react';
import LayoutDefault from '../../LayoutDefault';
import { routes } from '../../../routes/routes';
import { renderWithChakraAndRouter } from '../../../../tests/utils/renders';

describe('LayoutDefault', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children in the main area and the header with logo', () => {
    renderWithChakraAndRouter(
      <LayoutDefault>
        <div data-testid="test-content">Some content</div>
      </LayoutDefault>,
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();

    const homeLink = screen.getByLabelText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('shows/hides the Drawer (mobile menu) when clicking the hamburger button', async () => {
    jest.spyOn(chakra, 'useBreakpointValue').mockReturnValue('sm');

    const user = userEvent.setup();
    const { rerender } = renderWithChakraAndRouter(
      <LayoutDefault>Test</LayoutDefault>,
    );

    const menuButton = screen.getByLabelText('Toggle navigation menu');
    expect(menuButton).toBeInTheDocument();

    await user.click(menuButton);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close');
    await user.click(closeButton);
    rerender(
      <MemoryRouter>
        <LayoutDefault>Test</LayoutDefault>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders the sidebar (Desktop)', () => {
    jest.spyOn(chakra, 'useBreakpointValue').mockReturnValue('md');

    renderWithChakraAndRouter(<LayoutDefault>Test</LayoutDefault>);

    const sidebar = screen.getByRole('navigation', { hidden: true });
    expect(sidebar).toBeInTheDocument();

    routes.forEach((route) => {
      const allMatches = screen.getAllByText(route.name);

      const visibleLink = allMatches.find((el) => el.closest('a'));
      expect(visibleLink).toBeTruthy();
    });
  });

  test('clicks on a Drawer link', async () => {
    jest.spyOn(chakra, 'useBreakpointValue').mockReturnValue('base');
    const user = userEvent.setup();
    const { rerender } = renderWithChakraAndRouter(
      <LayoutDefault>Test</LayoutDefault>,
    );

    const menuButton = screen.getByLabelText('Toggle navigation menu');
    await user.click(menuButton);
    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();

    const firstLink = screen.getByTestId(`nav-link-${routes[0].name}-mobile`);
    await user.click(firstLink);

    rerender(
      <MemoryRouter>
        <LayoutDefault>Test</LayoutDefault>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
