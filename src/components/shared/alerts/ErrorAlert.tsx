import CloseIcon from '@mui/icons-material/CloseOutlined';
import { Alert, AlertProps, IconButton } from '@mui/material';

interface Props extends AlertProps {
  message: string | string[];
  handleDismiss?: () => void;
}

const ErrorAlert = ({ message, handleDismiss, ...props }: Props) => {
  return (
    <Alert
      icon={false}
      severity='error'
      variant='filled'
      style={{ backgroundColor: '#F6433C' }}
      action={
        handleDismiss ? (
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleDismiss}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        ) : null
      }
      {...props}
      sx={{
        mb: 3,
      }}
    >
      {Array.isArray(message)
        ? message.map((m) => <li key={m}>{m}</li>)
        : message}
    </Alert>
  );
};

export default ErrorAlert;
