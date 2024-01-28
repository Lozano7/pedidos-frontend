import {
  IconChecklist,
  IconFilePlus,
  IconFolder,
  IconUserPlus,
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

export const routeAdmin = [
  {
    navlabel: true,
    subheader: 'Reportes',
  },

  {
    id: uniqueId(),
    title: 'Estadísticas del día',
    icon: IconFolder,
    href: '/dashboard/reports',
  },
  {
    id: uniqueId(),
    title: 'Consumo de los usuarios',
    icon: IconFolder,
    href: '/dashboard/reports/consumo-de-usuarios',
  },
  {
    navlabel: true,
    subheader: 'Usuarios',
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
  {
    navlabel: true,
    subheader: 'Pedidos',
  },
  {
    id: uniqueId(),
    title: 'Ver pedidos',
    icon: IconChecklist,
    href: '/dashboard/pedidos/ver-pedidos',
  },
];

export const routeRestaurant = [
  {
    navlabel: true,
    subheader: 'Pedidos',
  },
  {
    id: uniqueId(),
    title: 'Ver pedidos',
    icon: IconChecklist,
    href: '/dashboard/restaurants/pedidos',
  },
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
