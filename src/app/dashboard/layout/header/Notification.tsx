'use client';
import { Pedido } from '@/store/features/report/interfaces/consumption.interface';
import { socket } from '@/websocket';
import { Badge, Box, IconButton, Menu } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const Notification = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [notifications, setNotifications] = useState<Pedido[]>([]);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    socket.emit('join', localStorage.getItem('restaurantId'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('notification', (pedido) => {
      setNotifications((prev) => [...prev, pedido]);
    });
  }, []);

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
        {notifications && notifications.length > 0 ? (
          <Badge badgeContent={notifications.length} color='error'>
            <IconBellRinging />
          </Badge>
        ) : (
          <IconBellRinging />
        )}
      </IconButton>

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
        <Box p={2}>
          {notifications.length > 0 ? (
            notifications.map((pedido) => (
              <div key={`${pedido._id}`}>
                <p
                  style={{
                    fontSize: '12px',
                  }}
                >
                  <strong>{`${pedido.nameClient} `}</strong> ha realizado un
                  pedido
                </p>
              </div>
            ))
          ) : (
            <p
              style={{
                fontWeight: 'bold',
              }}
            >
              <i>No hay notificaciones</i>
            </p>
          )}
        </Box>
      </Menu>
    </Box>
  );
};

export default Notification;
