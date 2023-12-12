import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { IconArrowBack } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  style?: React.CSSProperties;
  isBack?: boolean;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  style,
  isBack,
}: Props) => {
  const router = useRouter();

  return (
    <Card
      elevation={9}
      variant={undefined}
      sx={{
        padding: 0,
        ...style,
      }}
    >
      {cardheading ? (
        <CardContent>
          <Typography variant='h5'>{headtitle}</Typography>
          <Typography variant='subtitle2' color='textSecondary'>
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: '30px' }}>
          {title ? (
            <Stack
              direction='row'
              spacing={2}
              justifyContent='space-between'
              alignItems={'center'}
              mb={3}
            >
              <Box>
                {title ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {isBack && (
                      <Button
                        onClick={() => {
                          router.back();
                        }}
                      >
                        <IconArrowBack size={24} />
                      </Button>
                    )}
                    <Typography variant='h5'>{title}</Typography>
                  </Box>
                ) : (
                  ''
                )}

                {subtitle ? (
                  <Typography variant='subtitle2' color='textSecondary' mt={2}>
                    {subtitle}
                  </Typography>
                ) : (
                  ''
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
