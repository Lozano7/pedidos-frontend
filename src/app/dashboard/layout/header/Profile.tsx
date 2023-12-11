'use client';
import { Avatar, Box, Button, IconButton, Menu } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const router = useRouter();

  return (
    <Box>
      <IconButton
        size='large'
        aria-label='show 11 new notifications'
        color='inherit'
        aria-controls='msgs-menu'
        aria-haspopup='true'
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src='/images/profile/user-1.jpg'
          alt='image'
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id='msgs-menu'
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <Box mt={1} py={1} px={2}>
          <Button
            variant='outlined'
            color='primary'
            fullWidth
            onClick={() => {
              localStorage.removeItem('x-token');
              router.push('/');
            }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
