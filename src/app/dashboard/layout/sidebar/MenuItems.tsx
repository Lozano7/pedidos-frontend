// const Menuitems = [
//   {
//     navlabel: true,
//     subheader: 'Change',
//   },

import { useAppSelector } from '@/store/hooks';
import { List } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';
import { rolesOptions } from './helpers/rolesOptions';

//   {
//     id: uniqueId(),
//     title: 'Cambiar estado de solicitud',
//     icon: IconEdit,
//     href: '/dashboard/change-status',
//   },
//   {
//     navlabel: true,
//     subheader: 'Update',
//   },
//   {
//     id: uniqueId(),
//     title: 'Actualizar listado',
//     icon: IconUpload,
//     href: '/dashboard/update-student-list',
//   },
//   {
//     navlabel: true,
//     subheader: 'Back',
//   },
//   {
//     id: uniqueId(),
//     title: 'Volver a consultas',
//     icon: IconArrowBack,
//     href: '/',
//   },

//   /*{
//     id: uniqueId(),
//     title: 'Shadow',
//     icon: IconCopy,
//     href: '/utilities/shadow',
//   },
//   {
//     navlabel: true,
//     subheader: 'Auth',
//   },
//   {
//     id: uniqueId(),
//     title: 'Login',
//     icon: IconLogin,
//     href: '/authentication/login',
//   },
//   {
//     id: uniqueId(),
//     title: 'Register',
//     icon: IconUserPlus,
//     href: '/authentication/register',
//   },
//   {
//     navlabel: true,
//     subheader: 'Extra',
//   },
//   {
//     id: uniqueId(),
//     title: 'Icons',
//     icon: IconMoodHappy,
//     href: '/icons',
//   },
//   {
//     id: uniqueId(),
//     title: 'Sample Page',
//     icon: IconAperture,
//     href: '/sample-page',
//   },*/
// ];

const MenuItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const [items, setItems] = useState<any>([]);

  const { user } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (user) {
      const { roles } = user;
      handleRolesOptions(roles);
    } else {
      const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
      if (roles.length > 0) {
        handleRolesOptions(roles);
      }
    }
  }, [user]);

  const handleRolesOptions = (roles: string[]) => {
    if (roles.includes('ADMIN')) {
      setItems(rolesOptions.ADMIN);
    } else {
      const newItems: any[] = [];
      roles.forEach((role: string) => {
        newItems.push(...rolesOptions[role as keyof typeof rolesOptions]);
      });
      setItems(newItems);
    }
  };

  return (
    <List sx={{ pt: 0 }} className='sidebarNav' component='div'>
      {items.map((item: any) => {
        // {/********SubHeader**********/}
        if (item.subheader) {
          return <NavGroup item={item} key={item.subheader} />;
        } else {
          return (
            <NavItem
              item={item}
              key={item.id}
              pathDirect={pathDirect}
              onClick={toggleMobileSidebar}
            />
          );
        }
      })}
    </List>
  );
};

export default MenuItems;
