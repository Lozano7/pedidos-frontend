import { routeAdmin, routeRestaurant, routeUser } from '../routesByRole';

export const rolesOptions = {
  ADMIN: routeAdmin,
  COLLABORATOR: routeUser,
  INTERN: routeUser,
  RESTAURANT: routeRestaurant,
};
