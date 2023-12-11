export interface StudentsResponse {
  data: StudentResponseData[];
  total: number;
  totalPages: number | null;
  page: number | null;
  limit: number | null;
}

export interface StudentResponseData {
  _id: string;
  periodo: string;
  carrera: string;
  nivel: string;
  identificacion: string;
  apellidos: string;
  nombres: string;
  sexo: string;
  etnia: string;
  numero_hijos: string;
  fecha_nacimiento: string;
  edad: string;
  foto_ingresada: string;
  fecha_foto: string;
  correo_institucional: string;
  correo_personal?: string;
  correo_siug: string;
  convencional?: string;
  celular?: string;
  direccion: string;
  referencia_domicilio: string;
  comprobante: string;
  usuario_registro: string;
  estado: string;
  concepto: string;
  vez: string;
  fecha_inicio_primer_nivel?: string;
  nivelacion: string;
  homologacion?: string;
  procedencia?: string;
  fecha_inicio_convalidacion?: string;
  nombre_conyuge?: string;
  discapacidad?: string;
  porcentaje_discapacidad?: string;
  tercera_matricula?: string;
  reingreso?: string;
  estado_solicitud?: string;
}
