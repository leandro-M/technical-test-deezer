import { BsHeart, BsHouse } from 'react-icons/bs';

import LayoutDefault from '../layout/LayoutDefault';
import { Favorites } from '../pages/Favorites';
import { Home } from '../pages/Home';

interface RouteConfig {
  name: string;
  path: string;
  element: React.FC;
  icon: React.FC;
  layout: React.FC<{ children: React.ReactNode }>;
}

export const routes: RouteConfig[] = [
  {
    name: 'Início',
    path: '/',
    icon: BsHouse,
    element: Home,
    layout: LayoutDefault,
  },
  {
    name: 'Favoritos',
    path: '/favorites',
    icon: BsHeart,
    element: Favorites,
    layout: LayoutDefault,
  },
];
