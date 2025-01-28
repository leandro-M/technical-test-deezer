import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { RouteWrapper } from './RouteWrapper';
import { routes } from './routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={`route-${route.name}`}
            path={route.path}
            element={
              <RouteWrapper layout={route.layout} element={route.element} />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
