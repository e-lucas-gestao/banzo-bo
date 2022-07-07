/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { callNurseApi, trueApi } from '../../services/api';
import { dateTimetoString, dateToStringFormatted } from '../../utils/dateConversion';
import { requestFields } from '../../utils/searchFields';

import { Table } from '../../components/Table/index.js';

import { Status } from '../../components/Table/Status';
import { Title } from '../../components/Title';
import { Input } from '../../components/InputDown';
import { SelectColumnFilter } from '../../components/Select';
import { capitalizeString } from '../../utils/stringFormat';
import { Button } from '../../components/Button';
import { useSocket } from '../../hooks/useSocket';

export interface Data {
  cdAtendimento: number; //
  nomeNivelCriticidade: string; //
  dataAbertura: Date; //
  statusAtendimento: string; //
  cnpjCliente: Number; //
  nomeAtendente: string;
  nomeGrupo: string;
  nomeCliente: string;
  IdInterno: number;
  cdEmpresa: number;
}

export const Requests: React.FC = () => {
  const idUsuario = sessionStorage.getItem('id');
  let navigate = useNavigate();
  const { novosAtendimentos, setNovosAtendimentos } = useSocket();

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'cdAtendimento',
        Filter: Input,
        filter: 'fuzzyText',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          value || 'Sem id'
        ),
      },
      {
        Header: 'Criticidade',
        accessor: 'nomeNivelCriticidade',
        Filter: SelectColumnFilter,
        filter: 'fuzzyText',
        width: 50,
        Cell: ({ cell: { value }, column: { id } }: any) => (
          value ? capitalizeString(value.replace(/_/g, ' ')) : 'Indisponível'
        ),
      },
      {
        Header: 'Abertura',
        accessor: 'dataAbertura',
        Filter: Input,
        filter: 'fuzzyText',
        width: 50,
        Cell: ({ cell: { value } }: any) => dateTimetoString(value),
      },
      {
        Header: 'Status',
        accessor: 'statusAtendimento',
        Filter: SelectColumnFilter,
        filter: 'fuzzyText',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          value ? capitalizeString(value.replace(/_/g, ' ')) : 'Indisponível'
        ),
      },
      {
        Header: 'CNPJ',
        accessor: 'cnpjCliente',
        Filter: Input,
        filter: 'fuzzyText',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          <span>{value || 'Indisponível'}</span>
        ),

        // capitalizeString
      },
      {
        Header: 'Solicitante',
        accessor: 'nomeCliente',
        Filter: Input,
        filter: 'fuzzyText',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          <span>{value || 'Indisponível'}</span>
        ),
      },
      {
        Header: 'Grupo',
        accessor: 'nomeGrupo',
        Filter: SelectColumnFilter,
        filter: 'fuzzyText',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          value ? capitalizeString(value.replace(/_/g, ' ')) : 'Indisponível'
        ),
      },
      {
        Header: 'Atribuido',
        accessor: 'nomeAtendente',
        filter: 'fuzzyText',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          <span>{value || 'Indisponível'}</span>
        ),
      },
      {
        Header: 'Ação',
        accessor: 'IdInterno',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          <Link to={{ pathname: `/requests-form/${value}` }}>
            <button
              type="button"
            >Ver
            </button>
          </Link>

        ),
      },
    ],
    [],
  );

  const [data, setData] = useState<Data[]>([]);
  async function fetchRequestData() {
    try {
      const response = await trueApi.post('/atendimento/pageSelect', { pageCount: 500, pageNumber: 1 });

      const atendimentosFormatados = response.data.atendimentos
        .map((atendimento : Data) => ({ ...atendimento, IdInterno: atendimento.cdAtendimento }));

      setData(atendimentosFormatados);
    } catch {
      toast.error('Erro ao carregador os dados.');
    }
  }
  useEffect(() => {
    fetchRequestData();
  }, []);
  useEffect(() => {
    setNovosAtendimentos(0);
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Bunzl | Atendimentos</title>
      </Helmet>
      <Title title="Atendimentos" />
      <Table
        fields={requestFields}
        columns={columns}
        data={data}
        atendimentosCounter={novosAtendimentos}
        // eslint-disable-next-line react/jsx-no-bind
        refreshRequests={fetchRequestData}
      />
    </>
  );
};
