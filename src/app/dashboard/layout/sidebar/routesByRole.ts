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
  {
    navlabel: true,
    subheader: 'Platos para el menú',
  },
  {
    id: uniqueId(),
    title: 'Administrar sopas',
    icon: IconFilePlus,
    href: '/dashboard/restaurants/sopas',
  },
  {
    id: uniqueId(),
    title: 'Administrar segundos',
    icon: IconFilePlus,
    href: '/dashboard/restaurants/seconds',
  },
  {
    id: uniqueId(),
    title: 'Administrar postres',
    icon: IconFilePlus,
    href: '/dashboard/restaurants/desserts',
  },
  {
    id: uniqueId(),
    title: 'Administrar bebidas',
    icon: IconFilePlus,
    href: '/dashboard/restaurants/drinks',
  },
];
