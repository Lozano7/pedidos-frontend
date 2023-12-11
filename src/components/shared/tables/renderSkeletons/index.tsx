import {
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const renderSkeletonRows = (rows: number, cols: number) => {
  /* eslint-disable */
  return (
    <>
      {[...new Array(rows)].map((_, index) => (
        <TableRow style={{ height: 32 }} key={index.toString()}>
          {[...new Array(cols)].map((_, index) => (
            <TableCell key={index.toString()}>
              <Skeleton variant='text' width='100%' height='100%' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export const renderTimeLineSkeleton = (node: number) => {
  return (
    <>
      {[...new Array(node)].map((_, index) => (
        <Grid
          item
          container
          margin={2}
          spacing={0}
          key={index.toString()}
          style={{ height: 55, width: 280 }}
        >
          <Grid item container spacing={2}>
            <Grid item container style={{ width: '45%' }}>
              <Skeleton
                variant='rectangular'
                sx={{ width: '100%', borderRadius: 3, height: 15 }}
              />
            </Grid>
            <Grid item container style={{ width: '10%' }}>
              <Skeleton variant='circular' width={14} height={14} />
            </Grid>
            <Grid item container style={{ width: '45%' }}>
              <Skeleton
                variant='rectangular'
                sx={{ width: '100%', borderRadius: 3, height: 15 }}
              />
            </Grid>
          </Grid>
          <Grid
            margin={1}
            item
            container
            justifyContent='center'
            style={{ height: '80%' }}
          >
            <Skeleton
              variant='rectangular'
              sx={{ width: 2, borderRadius: 3, height: 37 }}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export const renderSkeletonTable = (rows: number, cols: number) => {
  return (
    <Table>
      <TableHead>
        <TableRow style={{ height: 32 }}>
          {[...new Array(cols)].map((_, index) => (
            <TableCell key={index.toString()}>
              <Skeleton variant='text' width='100%' height='100%' />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...new Array(rows)].map((_, index) => (
          <TableRow style={{ height: 32 }} key={index.toString()}>
            {[...new Array(cols)].map((_, index) => (
              <TableCell key={index.toString()}>
                <Skeleton variant='text' width='100%' height='100%' />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const renderErrorOrEmptyRow = (colSpan: number, error?: string) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} style={{ textAlign: 'center' }}>
        {error ? error : 'No hay datos para visualizar'}
      </TableCell>
    </TableRow>
  );
};
