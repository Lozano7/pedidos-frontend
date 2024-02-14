import { baseURL } from '@/api/mainApi';
import { io } from 'socket.io-client';

export const socket = io(baseURL);
