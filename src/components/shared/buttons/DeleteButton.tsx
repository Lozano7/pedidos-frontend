import { IconButton, Tooltip } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

interface props {
  onClick: () => void | Promise<void> | null;
  btnText?: string;
}

const DeleteButton = ({ onClick, btnText = 'Eliminar' }: props) => {
  return (
    <Tooltip title={btnText}>
      <IconButton onClick={onClick}>
        <IconTrash />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
