import { IconButton, Tooltip, useTheme } from '@mui/material';
import { IconEdit } from '@tabler/icons-react';

interface props {
  onClick: () => void | null;
  btnText?: string;
  disabled?: boolean;
}

const EditButton = ({ onClick, btnText = 'Editar', disabled }: props) => {
  const theme = useTheme();

  return (
    <Tooltip title={btnText}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
          color: '#556cd6',
        }}
      >
        <IconEdit />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
