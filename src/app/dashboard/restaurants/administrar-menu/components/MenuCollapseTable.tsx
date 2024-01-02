import { Menu } from '@/store/features/menu/interfaces/menu.interface';
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
  menus: Menu[];
}

const MenuCollapseTable = ({ menus }: IProps) => {
  return (
    <TableContainer component={Paper} sx={{ border: 1 }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead sx={{ backgroundColor: '#EFF7FF' }}>
          <TableRow>
            <TableCell align='center'>N°</TableCell>
            <TableCell align='center'>Tipo</TableCell>
            <TableCell align='center'>Sopa</TableCell>
            <TableCell align='center'>Segundo</TableCell>
            <TableCell align='center'>Postre</TableCell>
            <TableCell align='center'>Jugo</TableCell>
            <TableCell align='center'>Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus?.map((menu, idx) => (
            <TableRow
              key={menu.type}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>{idx + 1}</TableCell>
              <TableCell align='center'>
                {menu.type === 'N' ? 'Normal' : 'Dieta'}
              </TableCell>
              <TableCell align='center'>{menu.soup}</TableCell>
              <TableCell align='center'>{menu.second}</TableCell>
              <TableCell align='center'>{menu.dessert}</TableCell>
              <TableCell align='center'>{menu.drink}</TableCell>
              <TableCell align='center'>{menu.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuCollapseTable;
