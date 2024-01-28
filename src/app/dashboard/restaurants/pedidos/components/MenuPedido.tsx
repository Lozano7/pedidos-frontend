import { IPedidoMenu } from '@/store/features/report/interfaces/consumption.interface';
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
  data: IPedidoMenu;
}

const MenuPedido = ({ data: menuPedido }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <TableContainer component={Paper} sx={{ border: 1 }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead sx={{ backgroundColor: '#EFF7FF' }}>
          <TableRow>
            <TableCell align='center'>Sopa</TableCell>
            <TableCell align='center'>Segundo</TableCell>
            <TableCell align='center'>Jugo</TableCell>
            <TableCell align='center'>Postre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align='center'>{menuPedido.soup}</TableCell>
            <TableCell align='center'>{menuPedido.second}</TableCell>
            <TableCell align='center'>{menuPedido.drink}</TableCell>
            <TableCell align='center'>{menuPedido.dessert}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuPedido;
