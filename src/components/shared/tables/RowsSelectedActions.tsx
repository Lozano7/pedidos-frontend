import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconChevronDown } from '@tabler/icons-react';
import * as React from 'react';

interface props {
  menuItems?: { title: string; action: () => void; disable?: boolean }[];
}

const RowsSelectedActions = ({ menuItems }: props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<IconChevronDown />}
        size='small'
      >
        Acciones
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems?.map((m) => (
          <MenuItem
            disabled={m.disable}
            key={`key${m.title}`}
            onClick={() => {
              m.action();
              handleClose();
            }}
          >
            {m.title}
          </MenuItem>
        ))}
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
};

export default RowsSelectedActions;
