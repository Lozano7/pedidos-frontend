'use-client';
import { Box } from '@mui/material';
import Menuitems from './MenuItems';

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  return (
    <Box sx={{ px: 3 }}>
      <Menuitems toggleMobileSidebar={toggleMobileSidebar} />
    </Box>
  );
};
export default SidebarItems;
