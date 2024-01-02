import { IconButton, Tooltip } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

interface props {
  onClick: () => void | Promise<void> | null;
  btnText?: string;
  disabled?: boolean;
}

const DeleteButton = ({ onClick, btnText = 'Eliminar', disabled }: props) => {
  return (
    <Tooltip title={btnText}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
          color: '#ff1744',
        }}
      >
        <IconTrash />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
