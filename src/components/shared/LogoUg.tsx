import { Box } from '@mui/material';
import Image from 'next/image';

interface LogoUgType {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const LogoUg = ({ height = 100, width = 350, style }: LogoUgType) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Image
        src='/images/logos/logo-viamatica.png'
        alt='logo'
        width={width}
        height={height}
        style={style}
      />
    </Box>
  );
};

export default LogoUg;
