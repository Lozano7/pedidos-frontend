import { TablerIconsProps } from '@tabler/icons-react';

export interface IItemsByRoles {
  id: string;
  title: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  href: string;
  navlabel?: string;
  subheader?: string;
}
