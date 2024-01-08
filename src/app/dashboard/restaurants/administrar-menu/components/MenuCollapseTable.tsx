import { setMenuForType } from '@/store/features/menu/menuSlice';
import { useAppDispatch } from '@/store/hooks';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { MenuResponseData } from '../interfaces/menu.interface';

interface IProps {
  data: MenuResponseData;
  handleIsViewDialog?: () => void;
}

const MenuCollapseTable = ({ data, handleIsViewDialog }: IProps) => {
  const { menus } = data;
  const dispatch = useAppDispatch();
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
            {handleIsViewDialog && (
              <TableCell align='center'>Opciones</TableCell>
            )}
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
              {handleIsViewDialog && (
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    startIcon={<IconPlus />}
                    onClick={() => {
                      handleIsViewDialog();
                      dispatch(setMenuForType(menu));
                    }}
                  >
                    Escoger
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuCollapseTable;
