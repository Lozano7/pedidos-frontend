import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  email: Yup.string().required('table.required.name'),
  password: Yup.string().required('table.required.state'),
  name: Yup.string().required('table.required.description'),
  lastName: Yup.string().required('table.required.rol.keyword'),
  identification: Yup.string().required('table.required.rol.keyword'),
  roles: Yup.array().required('table.required.rol.keyword'),
});
