import * as Yup from 'yup';

export const menuSchema = Yup.object().shape({
  date: Yup.string().required('La fecha es requerida'),
  menus: Yup.array().min(1, 'Debe agregar al menos un menú'),
  restaurantId: Yup.string().required('El id restaurante es requerido'),
  restaurantName: Yup.string().required(
    'El nombre del restaurante es requerido'
  ),
  restaurantAddress: Yup.string().required(
    'La dirección del restaurante es requerida'
  ),
  restaurantStartOrderTime: Yup.string().required(
    'La hora de inicio de pedidos es requerida'
  ),
  restaurantEndOrderTime: Yup.string().required(
    'La hora de fin de pedidos es requerida'
  ),
  restaurantDeliveryTime: Yup.string().required(
    'El tiempo de entrega es requerido'
  ),
});

export const menuFormSchema = Yup.object().shape({
  type: Yup.string().required('El tipo es requerido'),
  soup: Yup.string().required('La sopa es requerida'),
  second: Yup.string().required('El segundo es requerido'),
  drink: Yup.string().required('La bebida es requerida'),
  price: Yup.string().required('El precio es requerido'),
  dessert: Yup.string().required('El postre es requerido'),
});
