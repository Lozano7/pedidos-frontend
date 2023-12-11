import React, { FunctionComponent, ReactElement } from 'react';

// material-ui
import {
  CardContentProps,
  CardHeaderProps,
  CardProps,
  ChipProps,
  SvgIconTypeMap,
  TableBodyProps,
  TableCellBaseProps,
  TableCellProps,
  TableContainerProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

/**
 * Material UI custom interfaces
 */

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type DateRange = { start: number | Date; end: number | Date };

// export type GetComparator = (
//   o: ArrangementOrder,
//   o1: string
// ) => (a: KeyedObject, b: KeyedObject) => number;

export type Direction = 'up' | 'down' | 'right' | 'left';

export type DialogMaxWidthType =
  | false
  | 'sm'
  | 'xs'
  | 'md'
  | 'lg'
  | 'xl'
  | undefined;

export interface TabsProps {
  children?: React.ReactElement | string;
  value: string | number;
  index: number;
}

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
    })
  | React.ComponentClass<any>
  | FunctionComponent<any>;

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export interface ProfileCardProps {
  id: string;
  icon: JSX.Element;
  title: string;
  subtitle?: string;
}

export interface EnhancedTableHeadProps extends TableCellProps {
  // eslint-disable-next-line no-unused-vars
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  // eslint-disable-next-line no-unused-vars
  onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type NavItemType = {
  id?: string;
  icon?: GenericCardProps['iconPrimary'];
  target?: boolean;
  external?: string;
  url?: string | undefined;
  type?: string;
  title?: string;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  caption?: React.ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  chip?: ChipProps;
  children?: NavItemType[];
  permissionKey?: string | string[];
  subLinks?: NavItemType[];
  menuId?: string;
};

export type NavItemTypeObject = {
  children?: NavItemType[];
  items?: NavItemType[];
  type?: string;
};

export interface ColorPaletteProps {
  color: string;
  label: string;
  value: string;
}

export interface ColorProps {
  readonly [key: string]: string;
}

export type GuardProps = {
  children: ReactElement | null;
};

export interface StringColorProps {
  id?: string;
  label?: string;
  color?: string;
  primary?: string;
  secondary?: string;
}

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface FormInputProps {
  bug: KeyedObject;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | undefined;
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  InputProps?: {
    label: string;
    startAdornment?: React.ReactNode;
  };
}

// eslint-disable-next-line no-unused-vars
export type HandleFunction = (i: string, s: string) => Promise<void>;

export type Event = {
  id: string;
  allDay: boolean;
  color: string;
  textColor?: string;
  description: string;
  start: Date;
  end: Date;
  title: string;
};

// eslint-disable-next-line no-unused-vars
export type StringBoolFunc = (s: string) => boolean;
// eslint-disable-next-line no-unused-vars
export type StringNumFunc = (s: string) => number;
// eslint-disable-next-line no-unused-vars
export type NumbColorFunc = (n: number) => StringColorProps | undefined;
// eslint-disable-next-line no-unused-vars
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type PrimitiveType = string | Symbol | number | boolean;

// Custom table props

export type TableHeaders<T extends {}> = Record<keyof T, string>;

// eslint-disable-next-line no-unused-vars
export type CustomRenderers<T extends {}> = Partial<
  Record<keyof T, (item: T) => React.ReactNode>
>;

export type CustomCellProperties<T extends {}> = Partial<
  Record<keyof T, TableCellBaseProps>
>;

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
}

export interface MuiTableProps {
  table?: TableProps;
  tableContainer?: TableContainerProps;

  tableHead?: TableHeadProps;
  tableHeadRows?: TableRowProps;
  tableHeadCells?: TableCellProps;

  tableRows?: TableRowProps;
  tableCells?: TableCellProps;
  tableBody?: TableBodyProps;
}
