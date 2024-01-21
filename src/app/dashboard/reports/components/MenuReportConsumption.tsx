import { DashboardConsumptionData } from '@/store/features/report/interfaces/consumption.interface';
import { useAppDispatch } from '@/store/hooks';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface IProps {
  data: DashboardConsumptionData;
  handleIsViewDialog?: () => void;
}

const MenuReportConsumption = ({ data, handleIsViewDialog }: IProps) => {
  const { pedidos } = data;
  const dispatch = useAppDispatch();
  return (
    <TableContainer component={Paper} sx={{ border: 1 }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead sx={{ backgroundColor: '#EFF7FF' }}>
          <TableRow>
            <TableCell align='center'>N°</TableCell>
            <TableCell align='center'>Fecha</TableCell>
            <TableCell align='center'>Restaurante</TableCell>
            <TableCell align='center'>Tipo de menú</TableCell>
            <TableCell align='center'>Sopa</TableCell>
            <TableCell align='center'>Segundo</TableCell>
            <TableCell align='center'>Jugo</TableCell>
            <TableCell align='center'>Postre</TableCell>
            <TableCell align='center'>Precio</TableCell>
            {handleIsViewDialog && (
              <TableCell align='center'>Opciones</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos?.map((pedido, idx) => (
            <TableRow
              key={`${pedido.clientId}-${idx}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>{idx + 1}</TableCell>
              <TableCell align='center'>{pedido.date}</TableCell>
              <TableCell align='center'>{pedido.nameRestaurant}</TableCell>
              <TableCell align='center'>{pedido.typeMenu}</TableCell>
              <TableCell align='center'>{pedido.soup}</TableCell>
              <TableCell align='center'>{pedido.second}</TableCell>
              <TableCell align='center'>{pedido.drink}</TableCell>
              <TableCell align='center'>{pedido.dessert}</TableCell>
              <TableCell align='center'>{pedido.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuReportConsumption;
