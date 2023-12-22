import * as Yup from 'yup';

export const restaurantSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  ruc: Yup.string().required('El ruc es requerido'),
  adminName: Yup.string().required('El nombre del administrador es requerido'),
  address: Yup.string().required('La dirección es requerida'),
  status: Yup.string().required('El estado es requerido'),
  phone: Yup.string(),
  startOrderTime: Yup.string().required('La hora de inicio es requerida'),
  endOrderTime: Yup.string().required('La hora de fin es requerida'),
  deliveryTime: Yup.string().required('El tiempo de entrega es requerido'),
});
