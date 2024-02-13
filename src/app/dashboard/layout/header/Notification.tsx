'use client';
import { Pedido } from '@/store/features/report/interfaces/consumption.interface';
import { socket } from '@/websocket';
import { Badge, Box, IconButton, Menu } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const Notification = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [notifications, setNotifications] = useState<Pedido[]>([]);

  console.log(notifications);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    console.log('Conectado al socket: ', socket);

    socket.emit('join', localStorage.getItem('restaurantId'));

    // Escuchar el evento 'notification'
    socket.on('notification', (pedido) => {
      console.log(pedido);
    });

    // Devuelve una función de limpieza para desconectar el socket cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, [notifications]);

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
        <Box mt={1} py={1} px={2}>
          {notifications.length ? (
            notifications.map((pedido, index) => (
              <div key={index}>
                <p
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {pedido.nameClient} ha realizado un nuevo pedido
                </p>
              </div>
            ))
          ) : (
            <p>No hay notificaciones</p>
          )}
        </Box>
      </Menu>
    </Box>
  );
};

export default Notification;
