import { AppRoutes } from '../AppRoutes';
import { renderWithProviders } from '../../../tests/utils/renders';

jest.mock('../RouteWrapper', () => ({
  RouteWrapper: jest.fn(({ element }) => <div>{element}</div>),
}));

describe('AppRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all routes with their corresponding elements', () => {
    renderWithProviders(<AppRoutes />);
  });
});
