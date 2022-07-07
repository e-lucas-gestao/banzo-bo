import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Chart } from '../Chart';
import { theme } from '../../styles/theme';

import { Container, DataBox } from './styles';
import { trueApi } from '../../services/api';

type DailyStars = {
  date: Date,
  stars: number,
}

interface DashboardResponse {
  SolicitacoesSemana: number[];
  Contagens: {
    Clientes: number;
    Usuarios: number;
    Solicitacoes: number;
    Trocas: number;
  }
}

export function DashboardData() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse>({} as DashboardResponse);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const { data } = await trueApi.get('/dashboard/SelecionarInfo');
      setDashboardData(data);

      setLoading(false);
      if (!data.Status) throw Error;
    } catch {
      toast.error('Erro ao buscar dados.');
    }
  }
  useEffect(() => {
    // fetchData();
  }, []);

  return (
    loading ? <p>Carregando...</p> : (
      <Container>
        <DataBox>
          <div>
            <p className="category">Atendimento Realizados</p>
            <p className="data">{dashboardData?.Contagens.Solicitacoes}</p>
          </div>

        </DataBox>

        <Chart weeklyRequests={dashboardData?.SolicitacoesSemana || []} />

      </Container>
    )
  );
}
