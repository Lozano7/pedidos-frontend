import * as Yup from 'yup';

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es requerido'),
  password: Yup.string()
    .matches(
      passwordRegex,
      'La contraseña debe de tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial'
    )
    .required('La contraseña es requerida'),
  name: Yup.string().required('Los nombres son requeridos'),
  lastName: Yup.string().required('Los apellidos son requeridos'),
  identification: Yup.string()
    .max(10, 'La identificación no puede tener más de 10 caracteres')
    .required('La identificación es requerida'),
  roles: Yup.array()
    .min(1, 'Al menos debe de escoger un rol')
    .required('Los roles son requeridos'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es requerida'),
});
export const userSchemaEdit = Yup.object().shape({
  email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es requerido'),

  name: Yup.string().required('Los nombres son requeridos'),
  lastName: Yup.string().required('Los apellidos son requeridos'),
  identification: Yup.string()
    .max(10, 'La identificación no puede tener más de 10 caracteres')
    .required('La identificación es requerida'),
  roles: Yup.array()
    .min(1, 'Al menos debe de escoger un rol')
    .required('Los roles son requeridos'),
});
