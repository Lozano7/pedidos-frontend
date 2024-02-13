'use client';
import { baseURL } from '@/api/mainApi';
import { Pedido } from '@/store/features/report/interfaces/consumption.interface';
import { Badge, Box, IconButton, Menu } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

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
    const socket = io(baseURL);
    // Escucha el evento 'newPedido' del servidor y actualiza las notificaciones
    socket.on('newPedido', (pedido) => {
      setNotifications((prevNotifications) => [...prevNotifications, pedido]);
    });

    // Devuelve una función de limpieza para desconectar el socket cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = io();

    // Escucha el evento 'newPedido' del servidor y actualiza las notificaciones
    socket.on('newPedido', (pedido) => {
      setNotifications((prevNotifications) => [...prevNotifications, pedido]);
    });

    // Devuelve una función de limpieza para desconectar el socket cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
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
        <Badge variant='dot' color='primary'>
          <IconBellRinging size='21' stroke='1.5' />
        </Badge>
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
          Aqui va las notificaciones
        </Box>
      </Menu>
    </Box>
  );
};

export default Notification;
