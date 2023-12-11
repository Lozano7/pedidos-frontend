import { IconButton, Tooltip, useTheme } from '@mui/material';
import { IconEdit } from '@tabler/icons-react';

interface props {
  onClick: () => void | null;
  btnText?: string;
}

const EditButton = ({ onClick, btnText = 'Editar' }: props) => {
  const theme = useTheme();

  return (
    <Tooltip title={btnText}>
      <IconButton onClick={onClick}>
        <IconEdit />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
