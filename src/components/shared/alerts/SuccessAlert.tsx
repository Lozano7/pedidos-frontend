import CloseIcon from '@mui/icons-material/CloseOutlined';
import { Alert, IconButton } from '@mui/material';

const SuccessAlert = ({
  message,
  messageComponent,
  handleDismiss,
}: {
  message?: string;
  messageComponent?: JSX.Element;
  handleDismiss?: () => void;
}) => {
  return (
    <Alert
      icon={false}
      severity='success'
      variant='filled'
      style={{ backgroundColor: '#BDF2D5' }}
      action={
        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={handleDismiss}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      }
      sx={{
        mb: 3,
      }}
    >
      {message || messageComponent}
    </Alert>
  );
};

export default SuccessAlert;
