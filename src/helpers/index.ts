import { PrimitiveType } from '@/shared/interfaces/material-ui.interface';

export const objectKeys = <T extends {}>(obj: T) => {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
};
export const isEmptyObject = <T extends {}>(obj: T) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const isPrimitive = (value: any): value is PrimitiveType => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  );
};
