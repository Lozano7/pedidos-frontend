'use client';
import { Box, Button, Typography } from '@mui/material';
import { IconFile, IconSquareRoundedXFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ConfirmDialog from './ConfirmDialog';

interface DragAndDropProps {
  acceptedFileTypes: {
    [key: string]: string[];
  };
  maxSize?: number;
  maxFiles?: number;
  height?: string;
  handleUpload: (
    file: File,
    seLoading: (loading: boolean) => void,
    setIsSuccess: (isSuccess: boolean) => void,
    setIsError: (isError: boolean) => void,
    setErrorMessage: (errorMessage: string) => void
  ) => void;
}

export const DragAndDrop = ({
  acceptedFileTypes,
  maxSize,
  height,
  maxFiles = 1,
  handleUpload,
}: DragAndDropProps) => {
  const [files, setfiles] = useState<File[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: acceptedFileTypes,
    maxSize,
    maxFiles,
  });

  useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setfiles(acceptedFiles);
    }
  }, [acceptedFiles]);

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          borderRadius: 4,
          padding: 2,
          textAlign: 'center',
          width: '100%',
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />

        <Typography variant='h6' component='p'>
          Arrastre y suelte el archivo aquí, o haga clic para seleccionar el
          archivo
        </Typography>

        <Typography
          variant='body1'
          component='p'
          sx={{
            mt: 2,
          }}
        >
          El archivo debe ser de tipo:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {Object.entries(acceptedFileTypes)
              .map(([key, value]) => value)
              .join()}{' '}
          </span>
          .
        </Typography>
      </Box>
      {files.length > 0 && (
        <>
          <Box
            sx={{
              mt: 4,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <IconSquareRoundedXFilled
                size={22}
                stroke={1.5}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  padding: 2,
                  cursor: 'pointer',
                  top: -10,
                  right: -10,
                }}
                onClick={() => {
                  setfiles([]);
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: 150,
                }}
              >
                <IconFile size={48} stroke={1.5} color='#ccc' />
                <Typography
                  variant='body1'
                  component='p'
                  sx={{
                    mt: 2,
                    textAlign: 'center',
                    wordBreak: 'break-all',
                  }}
                >
                  {files[0].name}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              Subir
            </Button>
          </Box>
          {openDialog && (
            <ConfirmDialog
              open={openDialog}
              onClose={() => {
                setOpenDialog(false);
                setIsSuccess(false);
                setIsError(false);
                setErrorMessage('');
                setfiles([]);
              }}
              onAccept={() => {
                handleUpload(
                  files[0],
                  setLoading,
                  setIsSuccess,
                  setIsError,
                  setErrorMessage
                );
              }}
              loading={loading}
              isSuccess={isSuccess}
              iserror={iserror}
              errorMessage={errorMessage}
              title='Está a punto de subir un archivo que actualizará la lista de estudiantes matriculados'
              subtitle='¿Está seguro de que desea actualizar la lista de estudiantes matriculados? Esta acción no se puede deshacer.'
            />
          )}
        </>
      )}
    </>
  );
};
