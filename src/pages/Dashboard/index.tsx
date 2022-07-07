import { Helmet } from 'react-helmet';
import { DashboardData } from '../../components/DashboardData';
import { Title } from '../../components/Title';
import { Container, Content } from './styles';

export const Dashboard: React.FC = () => (
  <>
    <Helmet>
      <title>Bunzl | Dashboard</title>
    </Helmet>
    <Title title="Dashboard" />
    <DashboardData />
  </>
);
