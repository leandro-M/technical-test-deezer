import React, { useState, useCallback } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  BoxProps,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

import Logo from '../../components/Logo';
import { routes } from '../../routes/routes';

interface LayoutDefaultProps {
  children: React.ReactNode;
}

interface Route {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface NavItemProps {
  route: Route;
  onClick?: () => void;
  isMobile?: boolean;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinkStyles = (isActive: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  color: isActive ? '#00C2FF' : '#B3B3B3',
  fontWeight: isActive ? 'bold' : 'normal',
  gap: '8px',
});

const NavItem: React.FC<NavItemProps> = ({
  route,
  onClick,
  isMobile = false,
}) => (
  <NavLink
    key={`${isMobile ? 'drawer' : 'nav'}-link-${route.name}`}
    to={route.path}
    style={({ isActive }) => navLinkStyles(isActive)}
    onClick={onClick}
    data-testid={`nav-link-${route.name}-${isMobile ? 'mobile' : 'desktop'}`}
  >
    <Box as={route.icon} mr={2} />
    {route.name}
  </NavLink>
);

const DesktopNavigation: React.FC<BoxProps> = (props) => (
  <Box
    as="aside"
    bg="gray.800"
    color="white"
    p={4}
    role="navigation"
    width={{ base: '100%', md: '250px' }}
    minWidth={{ md: '250px' }}
    display={{ base: 'none', md: 'block' }}
    {...props}
  >
    <Flex direction="column" gap={2}>
      {routes.map((route) => (
        <NavItem key={route.name} route={route} />
      ))}
    </Flex>
  </Box>
);

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => (
  <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
    <DrawerOverlay />
    <DrawerContent bg="gray.800" color="white">
      <DrawerCloseButton />
      <DrawerBody>
        <Flex direction="column" gap={4} mt={6}>
          {routes.map((route) => (
            <NavItem
              key={route.name}
              route={route}
              onClick={onClose}
              isMobile
            />
          ))}
        </Flex>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);

const LayoutDefault: React.FC<LayoutDefaultProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <Flex direction="column" minHeight="100vh">
      <Flex
        as="header"
        bg="gray.800"
        color="white"
        p={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Toggle navigation menu"
          display={{ base: 'block', md: 'none' }}
          onClick={toggleMenu}
        />

        <NavLink to="/" style={{ color: '#fff' }} aria-label="Home">
          <Logo />
        </NavLink>
      </Flex>

      <Flex flex="1" direction={{ base: 'column', md: 'row' }}>
        <DesktopNavigation />
        <MobileDrawer isOpen={isMenuOpen} onClose={toggleMenu} />

        <Box as="main" flex="1" bg="gray.900" color="white">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default LayoutDefault;
