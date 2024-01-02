import { IconFilePlus, IconFolder, IconUserPlus } from '@tabler/icons-react';
import { uniqueId } from 'lodash';

export const routeAdmin = [
  {
    navlabel: true,
    subheader: 'Reportes',
  },

  {
    id: uniqueId(),
    title: 'Reportes de consumo',
    icon: IconFolder,
    href: '/dashboard/reportes-consumo',
  },
  {
    navlabel: true,
    subheader: 'Colaboradores',
  },
  {
    id: uniqueId(),
    title: 'Administrar',
    icon: IconUserPlus,
    href: '/dashboard/users',
  },
  {
    navlabel: true,
    subheader: 'Restaurantes',
  },
  {
    id: uniqueId(),
    title: 'Administrar',
    icon: IconUserPlus,
    href: '/dashboard/restaurants',
  },

  /*{
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/utilities/shadow',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/authentication/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/authentication/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },*/
];

export const routeUser = [
  {
    navlabel: true,
    subheader: 'Menú',
  },
  {
    id: uniqueId(),
    title: 'Realizar pedido',
    icon: IconFilePlus,
    href: '/dashboard/pedidos',
  },
];

export const routeRestaurant = [
  {
    navlabel: true,
    subheader: 'Menú',
  },
  {
    id: uniqueId(),
    title: 'Administrar menú',
    icon: IconFilePlus,
    href: '/dashboard/restaurants/administrar-menu',
  },
];
