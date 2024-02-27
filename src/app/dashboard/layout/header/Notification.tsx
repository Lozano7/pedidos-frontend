'use client';
import { setNotificacionPedidos } from '@/store/features/pedidos/pedidosSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { socket } from '@/websocket';
import { Badge, Box, IconButton, Menu } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Notification = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { notificacionPedidos } = useAppSelector(
    (state) => state.pedidoReducer
  );

  const router = useRouter();

  const dispatch = useAppDispatch();

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
      //setNotifications((prev) => [...prev, pedido]);
      dispatch(setNotificacionPedidos([...notificacionPedidos, pedido]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {notificacionPedidos && notificacionPedidos.length > 0 ? (
          <Badge badgeContent={notificacionPedidos.length} color='error'>
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
          {notificacionPedidos.length > 0 ? (
            notificacionPedidos.map((pedido) => (
              <Box
                key={`${pedido._id}`}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={() => {
                  router.push(`/dashboard/restaurants/pedidos`);
                  handleClose2();
                  dispatch(setNotificacionPedidos([]));
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                  }}
                >
                  <strong>{`${pedido.nameClient} `}</strong> ha realizado un
                  pedido
                </p>
              </Box>
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
