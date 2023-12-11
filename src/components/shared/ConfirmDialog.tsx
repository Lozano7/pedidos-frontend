import {
  ArrowBack,
  CancelOutlined,
  CheckCircleOutline,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  subtitle: string;
  loading: boolean;
  isSuccess: boolean;
  iserror: boolean;
  errorMessage: string;
  children?: React.ReactNode;
}

const ConfirmDialog = ({
  open,
  onClose,
  onAccept,
  title,
  subtitle,
  loading,
  isSuccess,
  iserror,
  errorMessage,
  children,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        {loading && (
          <>
            <DialogTitle>
              <Typography
                variant='body1'
                sx={{
                  color: 'primary.main',
                  textAlign: 'center',
                }}
              >
                Actualizando lista de estudiantes matriculado, por favor
                espere...
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CircularProgress
                sx={{
                  color: 'primary.main',
                  margin: 'auto',
                }}
              />
              <Typography
                variant='body1'
                sx={{
                  my: 2,
                  textAlign: 'center',
                }}
              >
                Cargando...
              </Typography>
            </DialogContent>
          </>
        )}

        {isSuccess && (
          <>
            <DialogTitle>
              <Typography
                variant='body1'
                sx={{
                  color: 'success.main',
                }}
              >
                ¡Listo!
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography variant='body1'>
                La lista de estudiantes matriculados se ha actualizado
                correctamente.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} disabled={loading}>
                <IconButton>
                  <CheckCircleOutline
                    sx={{
                      color: 'success.main',
                    }}
                  />
                </IconButton>
                Aceptar
              </Button>
            </DialogActions>
          </>
        )}

        {iserror && (
          <>
            <DialogTitle
              sx={{
                color: 'error.main',
              }}
            >
              <Box
                sx={{
                  display: 'flex',

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CancelOutlined
                  sx={{
                    color: 'error.main',
                    marginRight: 1,
                    fontSize: '5rem',
                  }}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography
                variant='h5'
                sx={{
                  color: 'error.main',
                  textAlign: 'center',
                }}
              >
                ¡Ups! Ha ocurrido un error al subir el archivo.
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  mt: 2,
                }}
              >
                No se ha podido actualizar la lista de estudiantes matriculados.
              </Typography>
              <Typography variant='body1'>Error: </Typography>

              <Typography variant='body1'>{errorMessage.toString()}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} disabled={loading}>
                <ArrowBack />
                Volver
              </Button>
            </DialogActions>
          </>
        )}

        {!isSuccess && !iserror && !loading && (
          <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Typography variant='body1'>{subtitle}</Typography>
              {children}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  onClose();
                }}
                disabled={loading}
              >
                <ArrowBack />
                Volver
              </Button>
              <Button
                onClick={() => {
                  onAccept();
                }}
                disabled={loading}
              >
                <CheckCircleOutline
                  sx={{
                    color: 'success.main',
                  }}
                />
                Aceptar
              </Button>
            </DialogActions>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
