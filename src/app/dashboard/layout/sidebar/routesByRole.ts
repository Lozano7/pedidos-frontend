import { IconFolder, IconUserPlus } from '@tabler/icons-react';
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
    title: 'Menú del dia',
    icon: IconUserPlus,
    href: '/dashboard/update-student-list',
  },
];

export const routeRestaurant = [
  {
    navlabel: true,
    subheader: 'Menú',
  },
  {
    id: uniqueId(),
    title: 'Administrar',
    icon: IconUserPlus,
    href: '/dashboard/update-student-list',
  },
];
