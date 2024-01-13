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
