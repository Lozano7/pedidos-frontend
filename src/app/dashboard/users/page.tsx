'use client';
import SimplePage from '@/components/sample-page/page';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import EditButton from '@/components/shared/buttons/EditButton';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { useGetUsersQuery } from '@/store/features/users/userApiSlice';
import {
  setUsersTableLimit,
  setUsersTablePage,
  setUsersTableSearch,
} from '@/store/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, Chip, Stack } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

const Page = () => {
  const { usersTable } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersQuery({
    page: usersTable.page,
    limit: usersTable.limit,
    search: usersTable.search,
  });

  return (
    <SimplePage
      title='Administrar usuarios'
      subtitle='En esta sección puedes administrar los usuarios de la plataforma'
    >
      <Box sx={{ mt: 3 }}>
        <SearchPaginatedTable
          data={
            users?.data?.map((client, index) => ({
              number: usersTable.limit * (usersTable.page - 1) + index + 1,
              name: `${client.name} ${client.lastName}`,
              id: client.identification,
              email: client.email,
              roles: client.roles,
              options: '',
            })) || []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            name: 'Nombre',
            id: 'Identificación',
            email: 'Correo',
            roles: 'Roles',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.id)}
          page={usersTable.page}
          perPage={usersTable.limit}
          search={usersTable.search}
          searchPlacehoder='Buscar por su número de identificación'
          setPage={(page: number) => {
            dispatch(setUsersTablePage(page));
          }}
          setPerPage={
            (limit: number) => {
              dispatch(setUsersTableLimit(limit));
            }
            // setSize
          }
          setSearch={
            (search: string) => {
              dispatch(setUsersTableSearch(search));
            }
            // setSearch
          }
          total={Number(users?.total || 0)}
          numHeader={6}
          ActionButtons={
            <Button
              variant='contained'
              startIcon={<IconPlus />}
              onClick={() => {}}
            >
              Agregar
            </Button>
          }
          customDataCellsProperties={{
            id: {
              align: 'center',
            },
            name: {
              align: 'center',
            },
            number: {
              align: 'center',
            },
            email: {
              align: 'center',
            },
            roles: {
              align: 'center',
            },
            options: {
              align: 'center',
            },
          }}
          customRenderers={{
            roles: ({ roles }) => {
              return (
                <Stack
                  direction='row'
                  spacing={1}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {roles.map((role: string, index: number) => (
                    <Chip
                      key={`${role}-${index}`}
                      label={role}
                      color='primary'
                      variant='outlined'
                    />
                  ))}
                </Stack>
              );
            },
            options: (user) => {
              return (
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <EditButton onClick={() => {}} />
                  <DeleteButton onClick={() => {}} />
                </Stack>
              );
            },
          }}
        />
      </Box>
    </SimplePage>
  );
};

export default Page;
