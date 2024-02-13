import { AppBar, Box, IconButton, Stack, Toolbar, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// components
import { IconMenu } from '@tabler/icons-react';
import Notification from './Notification';
import Profile from './Profile';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [role, setRole] = useState<string[]>([]);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const rolesString = localStorage.getItem('userRoles');
    const rolesParse = JSON.parse(rolesString || '[]');
    setRole(rolesParse);
  }, []);

  return (
    <AppBarStyled position='sticky' color='default'>
      <ToolbarStyled>
        <IconButton
          color='inherit'
          aria-label='menu'
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width='20' height='20' />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction='row' alignItems='center'>
          {role.includes('RESTAURANT') && <Notification />}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
