import { isPrimitive, objectKeys } from '@/helpers';
import {
  CustomCellProperties,
  CustomRenderers,
  MuiTableProps,
  TableHeaders,
} from '@/shared/interfaces/material-ui.interface';
import {
  Badge,
  Box,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Dispatch, SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconMinus,
  IconPlus,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { SetStateAction, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import RowsSelectedActions from './RowsSelectedActions';
import { renderErrorOrEmptyRow, renderSkeletonRows } from './renderSkeletons';

interface OnCLickI {
  // funcion trigger
  onClickFunc: (arg0: string | number) => void;
  // isSelection y selected se usaran por si se quiere sombrear la fila seleccionada
  isSelection?: boolean;
  selected?: string | number;
  /** key que identificara cual sera el parametro para la funcion y cual sera la key del match */
  funcKey: string;
}

export interface FilterArrow {
  name: string;
  direction: string;
}

interface ListFilterArrow {}

interface Props<T extends {}> {
  headers: TableHeaders<T>;
  data: T[];
  keyExtractor: (item: T) => string;
  customRenderers?: CustomRenderers<T>;
  searchPlacehoder: string;
  customDataCellsProperties?: CustomCellProperties<T>;
  customHeadersCellsProperties?: CustomCellProperties<T>;
  isLoading: boolean;
  isFetching: boolean;
  error: FetchBaseQueryError | SerializedError | undefined | string;
  total: number;
  perPage: number;
  setPerPage?:
    | React.Dispatch<React.SetStateAction<number>>
    | ((perPage: number) => void)
    | undefined;
  page: number;
  numHeader: number;
  setPage?:
    | React.Dispatch<React.SetStateAction<number>>
    | ((page: number) => void)
    | undefined;
  search: string;
  /** ```undefined``` solo si no se usara paginada la tabla */
  setSearch:
    | React.Dispatch<React.SetStateAction<string>>
    | ((search: string) => void)
    | undefined;
  ActionButtons?: JSX.Element;
  actBtnFullWith?: boolean;
  replaceHeader?: boolean;
  selectedCount?: number;
  newHeader?: JSX.Element;
  showFilter?: boolean;
  listFilterArrows?: ListFilterArrow;
  setFilterArrow?:
    | React.Dispatch<React.SetStateAction<FilterArrow>>
    | (() => void);
  onClickObj?: OnCLickI;
  perPageBox?: Boolean;
  paginationBox?: Boolean;
  filtersPos?: 'top' | 'bottom';
  filterArrow?: FilterArrow;
  tableProps?: MuiTableProps;
  isCollapsible?: boolean;
  CollapsibleItems?: JSX.Element[];
  checkboxSelection?: boolean;
  rowsSelectedActions?: {
    title: string;
    action: () => void;
    disable?: boolean;
  }[];
  onChangeSelections?: (rows: T[]) => void;
  customTableSize?: [number, number, number];
  hideToolbars?: boolean;
  center?: boolean;
}

interface renderRowsProps<T extends {}> {
  row: T;
  isCollapsible: boolean;
  tableProps?: MuiTableProps;
  keyExtractor: any;
  onClickObj: any;
  customRenderers: any;
  customDataCellsProperties?: CustomCellProperties<T> | any;
  CollapsibleItems?: JSX.Element[];
  checkboxSelection?: boolean;
  isRowSelected?: boolean;
  rowsSelected?: any[];
  setRowsSelected?: Dispatch<SetStateAction<any[] | any>>;
  numCols: number;
  center?: boolean;
}

const RenderRow = <T extends {}>({
  row,
  isCollapsible,
  tableProps,
  keyExtractor,
  onClickObj,
  customRenderers,
  customDataCellsProperties,
  CollapsibleItems,
  checkboxSelection,
  isRowSelected,
  rowsSelected,
  setRowsSelected,
  numCols,
  center,
}: renderRowsProps<T>) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  // Checkeds Rows
  const [rowSelected, setRowSelected] = useState(false);
  const handleChecked = () => {
    setRowSelected(!rowSelected);
    if (!rowSelected) {
      // Add row selected
      const rowsTemp = [...rowsSelected!];
      rowsTemp.push(row);
      setRowsSelected!(rowsTemp!);
    } else {
      // Remove row selected
      const rowsTemp = [...rowsSelected!];
      const rowTemp: any = row;
      const rowIndex = rowsTemp.findIndex((r) => r.id === rowTemp.id); // eslint-disable-line no-use-before-define
      rowsTemp.splice(rowIndex, 1);
      setRowsSelected!(rowsTemp!);
    }
  };

  useEffect(() => {
    setRowSelected(isRowSelected || false);
  }, [isRowSelected]);

  return (
    <>
      <TableRow
        {...(tableProps && { ...tableProps.tableRows })}
        className='table-row'
        key={keyExtractor(row)}
        {...(onClickObj && {
          hover: true,
          onClick: () =>
            onClickObj.onClickFunc(
              row[onClickObj.funcKey as keyof T] as unknown as string
            ),
          sx: {
            cursor: 'pointer',
            ...(onClickObj.isSelection && {
              backgroundColor:
                (onClickObj.selected as unknown) ===
                (row[onClickObj.funcKey as keyof T] as unknown)
                  ? '#eee'
                  : '',
            }),
          }, //color provisional
        })}
      >
        {checkboxSelection && (
          <TableCell {...((tableProps && { ...tableProps.tableCells }) as any)}>
            <Checkbox
              checked={rowSelected}
              onChange={handleChecked}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell>
        )}
        {isCollapsible && (
          <TableCell {...((tableProps && { ...tableProps.tableCells }) as any)}>
            <Tooltip
              title={`${expanded ? 'Menos información' : 'Más información'}`}
            >
              <IconButton
                size='small'
                color='info'
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <IconMinus /> : <IconPlus />}
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
        {objectKeys(row).map((cell) => {
          const customRenderer = customRenderers?.[cell];

          if (customRenderer) {
            return (
              <TableCell
                {...((tableProps && { ...tableProps.tableCells }) as any)}
                key={`${keyExtractor(row)}-${cell.toString()}`}
                {...customDataCellsProperties?.[cell]}
                style={{ textAlign: center ? 'center' : '' }}
              >
                {customRenderer(row)}
              </TableCell>
            );
          }

          return (
            <TableCell
              {...((tableProps && { ...tableProps.tableCells }) as any)}
              key={`${keyExtractor(row)}-${cell.toString()}`}
              {...customDataCellsProperties?.[cell]}
              style={{ textAlign: center ? 'center' : '' }}
            >
              {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
              <>{isPrimitive(row[cell]) ? row[cell] : ''}</>
            </TableCell>
          );
        })}
      </TableRow>
      {isCollapsible && (
        <TableRow>
          <TableCell colSpan={numCols} sx={{ padding: 0, borderBottom: 0 }}>
            <Collapse in={expanded}>
              <div style={{ padding: 20, backgroundColor: 'whitesmoke' }}>
                {CollapsibleItems &&
                  CollapsibleItems.length > 0 &&
                  CollapsibleItems.find(
                    (item) => item.key === keyExtractor(row)
                  )}
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export const SearchPaginatedTable = <T extends {}>({
  data,
  headers,
  customRenderers,
  keyExtractor,
  searchPlacehoder,
  customDataCellsProperties,
  customHeadersCellsProperties,
  numHeader,
  isLoading,
  isFetching,
  error,
  perPage,
  setPerPage = () => {},
  total,
  page,
  setPage = () => {},
  search,
  setSearch = () => {},
  ActionButtons,
  actBtnFullWith,
  replaceHeader,
  // selectedCount,
  newHeader,
  showFilter = true,
  listFilterArrows = {},
  setFilterArrow: setFilterArrowDispatch,
  onClickObj,
  perPageBox = true,
  paginationBox = true,
  filtersPos = 'bottom',
  filterArrow: customFilterArrow,
  tableProps,
  isCollapsible,
  CollapsibleItems,
  checkboxSelection,
  rowsSelectedActions,
  onChangeSelections,
  customTableSize,
  hideToolbars,
  center,
}: Props<T>) => {
  const [searchFirst, setSearchFirst] = useState(search);

  useEffect(() => {
    if (page === 1) {
      //set search only if page is 1 -> page change to one on search input
      setSearch(searchFirst);
    }
  }, [page, searchFirst, setSearch]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (newPerPage: number) => {
    setAnchorEl(null);
    setPerPage(newPerPage);
  };

  const [filterArrow, setFilterArrow] = useState<FilterArrow>(
    customFilterArrow || null!
  );

  const handleFilterArrowDown = (
    name: string,
    direction: string,
    nameHeader: string
  ) => {
    setFilterArrow({ name: nameHeader, direction });
    if (setFilterArrowDispatch) setFilterArrowDispatch({ name, direction });
  };

  const handleFilterArrowUp = (
    name: string,
    direction: string,
    nameHeader: string
  ) => {
    setFilterArrow({ name: nameHeader, direction });
    if (setFilterArrowDispatch) setFilterArrowDispatch({ name, direction });
  };

  // Checkbox Actions
  const [checkedAllRows, setCheckedAllRows] = useState(false);
  const [rowsSelected, setRowsSelected] = useState<T[]>([]);

  const handleCheckedAllRows = async () => {
    await setCheckedAllRows(!checkedAllRows);
    if (!checkedAllRows) {
      const rows = data.map((row, index) => row);
      setRowsSelected(rows);
    } else {
      setRowsSelected([]);
    }
  };

  useEffect(() => {
    if (onChangeSelections) {
      onChangeSelections(rowsSelected);
    }
  }, [rowsSelected, onChangeSelections]);

  const caclNumColumns = () => {
    let rows = 0;
    rows = Object.keys(headers).length;
    if (isCollapsible) {
      rows += rows + 1;
    }
    if (checkboxSelection) {
      rows += rows + 1;
    }
    return rows;
  };

  const renderRows = () => {
    try {
      /* eslint-disable */
      return (
        <>
          {data!.map((row, index) => (
            <RenderRow
              customDataCellsProperties={customDataCellsProperties}
              customRenderers={customRenderers}
              isCollapsible={isCollapsible || false}
              keyExtractor={keyExtractor}
              onClickObj={onClickObj}
              row={row}
              tableProps={tableProps}
              key={index}
              CollapsibleItems={CollapsibleItems}
              checkboxSelection={checkboxSelection}
              isRowSelected={checkedAllRows ? true : false}
              rowsSelected={rowsSelected}
              setRowsSelected={setRowsSelected as any}
              numCols={caclNumColumns()}
              center={center}
            />
          ))}
        </>
      );
    } catch (errorRenderRow) {
      return (
        <>
          <td />
          <td />
        </>
      );
    }
  };

  return (
    <>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
        >
          <Grid item xs={12} sm={7} lg={6} sx={{ width: '100% !important' }}>
            {showFilter && !hideToolbars && (
              <DebounceInput
                autoFocus={Boolean(search)}
                minLength={2}
                debounceTimeout={300}
                onChange={({ target }) => {
                  setPage(1);
                  setSearchFirst(target.value);
                  // setSearch(target.value);
                }}
                value={search}
                //element={TextField}
                /* eslint-disable */
                element={(props) => (
                  <TextField
                    style={{
                      width: '100%',
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <IconSearch fontSize='small' />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            size='small'
                            onClick={() => {
                              setSearchFirst('');
                              setSearch('');
                            }}
                            {...(!search && {
                              sx: { cursor: 'initial', opacity: 0 },
                            })}
                          >
                            <IconX size={20} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder={searchPlacehoder}
                    variant='outlined'
                    size='small'
                    {...props}
                  />
                )}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={!actBtnFullWith && 5}
            lg={6}
            sx={{ textAlign: 'right', width: '100% !important' }}
          >
            {ActionButtons}
          </Grid>
        </Grid>
        <TableContainer
          {...(tableProps && { ...tableProps.tableContainer })}
          {...(replaceHeader &&
            !tableProps?.tableContainer && { sx: { mt: 2 } })}
        >
          <Table
            aria-label='simple table'
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
            }}
          >
            <TableHead
              {...(tableProps && { ...tableProps.tableHead })}
              style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}
            >
              <TableRow>
                {checkboxSelection && (
                  <TableCell colSpan={caclNumColumns()}>
                    <Grid
                      container
                      alignItems='center'
                      sx={{
                        border: 1,
                        borderColor: 'primary.main',
                        p: 2,
                        borderRadius: '.6rem',
                      }}
                    >
                      <Grid item>
                        <Typography>
                          Filas seleccionadas: &nbsp;&nbsp;&nbsp;
                          <Badge
                            badgeContent={
                              rowsSelected.length ? rowsSelected.length : '0'
                            }
                            color='primary'
                          />
                          &nbsp;&nbsp;&nbsp;
                        </Typography>
                      </Grid>
                      <Grid item>
                        <RowsSelectedActions menuItems={rowsSelectedActions} />
                      </Grid>
                    </Grid>
                  </TableCell>
                )}
              </TableRow>
              <TableRow {...(tableProps && { ...tableProps.tableHeadRows })}>
                {checkboxSelection && (
                  <TableCell
                    {...((tableProps && {
                      ...tableProps.tableHeadCells,
                    }) as any)}
                  >
                    <Checkbox
                      checked={checkedAllRows}
                      onChange={handleCheckedAllRows}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </TableCell>
                )}
                {isCollapsible ? (
                  <TableCell
                    {...((tableProps && {
                      ...tableProps.tableHeadCells,
                    }) as any)}
                  />
                ) : null}
                <>
                  {replaceHeader && { newHeader }}
                  {!replaceHeader &&
                    Object.keys(headers).map((key) => (
                      <TableCell
                        key={key}
                        {...((tableProps && {
                          ...tableProps.tableHeadCells,
                        }) as any)}
                        {...customHeadersCellsProperties?.[key as keyof T]}
                      >
                        <Grid
                          container
                          justifyContent='space-around'
                          alignItems='center'
                        >
                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: '800',
                              }}
                            >
                              {headers[key as keyof T]}
                            </Typography>
                          </Grid>
                          {Object.keys(listFilterArrows).some(
                            (e) => e === key
                          ) && (
                            <Grid item>
                              {/* <Grid item xs={6}> */}
                              <IconArrowNarrowDown
                                style={{
                                  color: 'inherit',
                                  cursor: 'pointer',
                                }}
                                stroke={
                                  filterArrow?.direction === 'asc' &&
                                  filterArrow?.name ===
                                    listFilterArrows[
                                      key as keyof ListFilterArrow
                                    ]
                                    ? 2
                                    : 1
                                }
                                size={18}
                                onClick={() =>
                                  handleFilterArrowUp(
                                    listFilterArrows[
                                      key as keyof ListFilterArrow
                                    ],
                                    'asc',
                                    listFilterArrows[
                                      key as keyof ListFilterArrow
                                    ]
                                  )
                                }
                              />
                              <IconArrowNarrowUp
                                style={{
                                  color: 'inherit',
                                  cursor: 'pointer',
                                }}
                                stroke={
                                  filterArrow?.direction === 'desc' &&
                                  filterArrow?.name ===
                                    listFilterArrows[
                                      key as keyof ListFilterArrow
                                    ]
                                    ? 2
                                    : 1
                                }
                                size={18}
                                onClick={() =>
                                  handleFilterArrowDown(
                                    listFilterArrows[
                                      key as keyof ListFilterArrow
                                    ],
                                    'desc',
                                    listFilterArrows[
                                      key as keyof ListFilterArrow
                                    ]
                                  )
                                }
                              />
                            </Grid>
                          )}
                        </Grid>
                      </TableCell>
                    ))}
                </>
              </TableRow>
            </TableHead>
            {
              //Body
            }
            <TableBody>
              {isFetching
                ? renderSkeletonRows(perPage, numHeader)
                : renderRows()}
              {data?.length === 0 &&
                !isFetching &&
                renderErrorOrEmptyRow(numHeader)}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={12} align='right'>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'right',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: '400',
                        mr: 1,
                      }}
                    >
                      {`Mostrando de 1 a ${perPage} de ${total} entradas`}
                    </Typography>
                    <Select
                      value={perPage || 10}
                      size='small'
                      sx={{
                        ml: 1,
                        mr: 1,
                      }}
                      onChange={(e) => {
                        setPerPage(Number(e.target.value));
                        setPage(1);
                      }}
                    >
                      <MenuItem value='10'>10</MenuItem>
                      <MenuItem value='20'>20</MenuItem>
                      <MenuItem value='30'>30</MenuItem>
                    </Select>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={6} align='center'>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Pagination
                      count={Math.ceil(total / perPage) || 1}
                      onChange={(e, page) => {
                        setPage(page);
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SearchPaginatedTable;
