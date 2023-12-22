import { middlewareApi } from '@/middleware';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import restaurantsReducer from './features/restaurants/restaurantSlice';
import { userApi } from './features/users/userApiSlice';
import usersReducer from './features/users/userSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    usersReducer,
    restaurantsReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      middlewareApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
