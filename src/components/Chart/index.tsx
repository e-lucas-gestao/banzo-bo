import ReactECharts from 'echarts-for-react'; // or var ReactECharts = require('echarts-for-react');
import { Container } from './styles';
import { theme } from '../../styles/theme';

interface ChartProps{
  weeklyRequests: number[];
}

export function Chart({ weeklyRequests }: ChartProps) {
  const options = {
    color: [theme.colors.blueMain],
    tooltip: {
      show: true,
    },
    dataset: {
      source: [
        ['type', 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        ['Últimos 7 dias', ...weeklyRequests],
      ],
    },
    title: {
      text: 'Total de Atendimentos / dia',
    },
    legend: { bottom: '10' },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
    },
    yAxis: {},
    series: [{
      type: 'bar',
      seriesLayoutBy: 'row',
    }],
  };
  return (
    <Container>

      <ReactECharts
        option={options}
        style={{ height: '100%', width: '100%' }}
      />
    </Container>
  );
}
