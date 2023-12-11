import { mainApi } from '@/api/mainApi';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { StudentsResponse } from '../../change-status/interfaces/studentRespondeData.interface';
import DashboardCard from '../shared/DashboardCard';

interface ProductProps {
  students: StudentsResponse | null | undefined;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  handleGetStudents: () => Promise<void>;
}

export const ProductPerformance = ({
  students,
  setLimit,
  setPage,
  handleGetStudents,
}: ProductProps) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [studentIdSelected, setStudentIdSelected] = useState('');
  const [newStatus, setNewStatus] = useState('Sin solicitud');

  const handleUpdateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      await mainApi.patch(`/students/update-status-tramite`, {
        id: studentIdSelected,
        estado_solicitud: newStatus,
      });
      await handleGetStudents();
      setIsSuccess(true);
      setLoading(false);
      setPage(students?.page || 1);
    } catch (error: any) {
      setIsError(true);
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <DashboardCard title='Listado de estudiantes'>
      <>
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Table
            aria-label='simple table'
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant='subtitle2' fontWeight={600}>
                    N.º
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2' fontWeight={600}>
                    Nombre
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2' fontWeight={600}>
                    Identificación
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2' fontWeight={600}>
                    Correo
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2' fontWeight={600}>
                    Estado del trámite
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant='subtitle2' fontWeight={600}>
                    Opciones
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students ? (
                students.data.map((student, idx) => (
                  <TableRow key={student.identificacion}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: '15px',
                          fontWeight: '500',
                        }}
                      >
                        {idx + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          <Typography variant='body2' fontWeight={600}>
                            {`${student.nombres} ${student.apellidos}`}
                          </Typography>
                          <Typography color='textSecondary' variant='body2'>
                            {student.carrera}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color='textSecondary'
                        variant='body2'
                        fontWeight={400}
                      >
                        {student.identificacion}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color='textSecondary'
                        variant='body2'
                        fontWeight={400}
                        sx={{
                          width: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {student.correo_siug.split(';').join(', ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          px: '4px',
                          backgroundColor: '#3c8084',
                          color: '#fff',
                        }}
                        size='small'
                        label={student.estado_solicitud}
                      ></Chip>
                    </TableCell>
                    <TableCell align='center'>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconButton>
                          <IconEdit
                            onClick={() => {
                              setOpenConfirmDialog(true);
                              setStudentIdSelected(student._id);
                            }}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align='center'>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      No hay datos
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={12} align='right'>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'right',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: '400',
                        mr: 1,
                      }}
                    >
                      {`Mostrando 1 a ${students?.limit} de ${students?.total} entradas`}
                    </Typography>
                    <Select
                      value={students?.limit || 10}
                      size='small'
                      sx={{
                        ml: 1,
                        mr: 1,
                      }}
                      onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                      }}
                    >
                      <MenuItem value='10'>10</MenuItem>
                      <MenuItem value='20'>20</MenuItem>
                      <MenuItem value='30'>30</MenuItem>
                    </Select>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Pagination
                      count={students?.totalPages || 1}
                      onChange={(e, page) => {
                        setPage(page);
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
        {openConfirmDialog && (
          <ConfirmDialog
            open={openConfirmDialog}
            loading={loading}
            errorMessage={
              errorMessage ? errorMessage : 'Ha ocurrido un error inesperado'
            }
            iserror={iserror}
            onClose={() => {
              setIsSuccess(false);
              setIsError(false);
              setErrorMessage('');
              setStudentIdSelected('');
              setOpenConfirmDialog(false);
            }}
            onAccept={() => {
              handleUpdateStatus(newStatus);
            }}
            title='Cambiar estado del trámite'
            subtitle='Seleccione el nuevo estado del trámite del estudiante'
            isSuccess={isSuccess}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Select
                fullWidth
                variant='outlined'
                size='small'
                sx={{
                  my: 2,
                }}
                value={newStatus}
                onChange={(e) => {
                  setNewStatus(e.target.value as string);
                }}
              >
                <MenuItem value='Sin solicitud'>Sin solicitud</MenuItem>
                <MenuItem value='Decano o Director'>Decano o Director</MenuItem>
                <MenuItem value='Secretaria'>Secretaria</MenuItem>
                <MenuItem value='Estudiante'>Estudiante</MenuItem>
              </Select>
            </Box>
          </ConfirmDialog>
        )}
      </>
    </DashboardCard>
  );
};

export default ProductPerformance;
