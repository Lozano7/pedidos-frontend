'use client';
import { mainApi } from '@/api/mainApi';
import SimplePage from '@/components/sample-page/page';
import { DragAndDrop } from '@/components/shared/DragAndDrop';

const page = () => {
  const handleUpload = async (
    file: File,
    seLoading: (loading: boolean) => void,
    setIsSuccess: (isSuccess: boolean) => void,
    setIsError: (isError: boolean) => void,
    setErrorMessage: (errorMessage: string) => void
  ) => {
    // Lógica para subir el archivo
    seLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    try {
      await mainApi.post('/students/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      seLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      seLoading(false);
      setIsError(true);
      setErrorMessage(error);
    }
  };

  return (
    <SimplePage
      title='Actualizar listado de estudiantes matriculados'
      subtitle='Seleccione el archivo de Excel con el listado de estudiantes matriculados o arrástrelo y suéltelo en el área de carga'
    >
      <DragAndDrop
        acceptedFileTypes={{
          'application/vnd.ms-excel': ['.xls'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
            '.xlsx',
          ],
        }}
        height='200px'
        handleUpload={(
          file,
          setLoading,
          setIsSuccess,
          setIsError,
          setErrorMessage
        ) =>
          handleUpload(
            file,
            setLoading,
            setIsSuccess,
            setIsError,
            setErrorMessage
          )
        }
      />
    </SimplePage>
  );
};

export default page;
