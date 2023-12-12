'use client';
import PageContainer from '@/app/dashboard/components/container/PageContainer';
import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';

interface SamplePageProps {
  children?: JSX.Element;
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  middlecontent?: string | JSX.Element;
  isBack?: boolean;
}

const SimplePage = ({
  children,
  action,
  cardheading,
  footer,
  headsubtitle,
  headtitle,
  middlecontent,
  subtitle,
  title,
  isBack,
}: SamplePageProps) => {
  return (
    <PageContainer>
      <DashboardCard
        title={title}
        subtitle={subtitle}
        action={action}
        footer={footer}
        cardheading={cardheading}
        headtitle={headtitle}
        headsubtitle={headsubtitle}
        middlecontent={middlecontent}
        isBack={isBack}
      >
        {children}
      </DashboardCard>
    </PageContainer>
  );
};

export default SimplePage;
