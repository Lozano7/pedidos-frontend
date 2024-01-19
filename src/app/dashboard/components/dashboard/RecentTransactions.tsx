import { LatestUser } from '@/store/features/report/interfaces/report.interface';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

interface Props {
  title: string;
  data: LatestUser[];
}

const RecentTransactions = ({ title, data }: Props) => {
  return (
    <DashboardCard title={title}>
      <>
        <Timeline
          className='theme-timeline'
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef',
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {data.map((item, index) => (
            <TimelineItem key={`${item._id}`}>
              <TimelineOppositeContent
                sx={{
                  fontSize: '12px',
                }}
              >
                {item.createdAt.toString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color='primary' variant='outlined' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontWeight='600'>{`${item.name} ${item.lastName}`}</Typography>{' '}
                <Typography variant='body2' display='block'>
                  {item.roles.join(' - ')}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
