import { routeAdmin, routeRestaurant, routeUser } from '../routesByRole';

export const rolesOptions = {
  ADMIN: routeAdmin,
  USER: routeUser,
  RESTAURANT: routeRestaurant,
};
