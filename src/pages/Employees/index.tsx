/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Table } from '../../components/Table/index.js';
import { trueApi } from '../../services/api';
import { employeesField } from '../../utils/searchFields';
import { capitalizeString } from '../../utils/stringFormat';

import { Status } from '../../components/Table/Status';
import { Title } from '../../components/Title';
import { Input } from '../../components/InputDown';
import { SelectColumnFilter } from '../../components/Select';

interface Data {
  name: string
  cpf: string
  email: string
  client: string
  re: string
  station: string
  cargo: string
  op_area: string
  status: string
  action: string
}

export interface Colaborador {
  IdInterno: number;
  Nome?: string;
  Email?: string;
  Cpf?: string;
  Re?: string;
  NomeCliente?: string;
  Endereco?: string;
  Estado?: string;
  Cidade?: string;
  Bairro?: string;
  Numero?: string;
  Complemento?: string;
  Posto?: string;
  Cargo?: string;
  Area?: string;
  Tipo?: number;

}

export const Employees: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'Nome', // accessor is the "key" in the data
        Filter: Input,
        filter: 'fuzzyText',
        width: 200,
        Cell: ({ cell: { value } }: any) => capitalizeString(value) || 'Indisponível',
      },
      {
        Header: 'CPF',
        accessor: 'Cpf',
        Filter: Input,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Indisponível' }</span>,
      },
      {
        Header: 'E-mail',
        accessor: 'Email',
        Filter: Input,
        filter: 'fuzzyText',
        width: 200,
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Indisponível' }</span>,
      },
      {
        Header: 'Cliente',
        accessor: 'NomeCliente',
        Filter: Input,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{ value ? capitalizeString(value.replace(/_/g, ' ')) : 'Indisponível'}</span>,
      },
      {
        Header: 'RE',
        accessor: 'Re',
        Filter: Input,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Indisponível' }</span>,
      },
      {
        Header: 'Posto',
        accessor: 'Posto',
        Filter: Input,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{value ? capitalizeString(value.replace(/_/g, ' ')) : 'Indisponível'}</span>,
      },
      {
        Header: 'Cargo',
        accessor: 'Cargo',
        Cell: ({ cell: { value } }: any) => <span>{ capitalizeString(value).replace('-', '') || 'Indisponível' }</span>,
      },
      {
        Header: 'Área Op.',
        accessor: 'Area',
        Filter: Input,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{ value ? capitalizeString(value.replace(/_/g, ' ')) : 'Indisponível' }</span>,
      },
      {
        Header: 'Tipo Colaborador',
        accessor: 'Tipo',
        width: 100,
        Cell: ({ cell: { value }, column: { id } }: any) =>
          <Status value={value} id={id} />,
        Filter: SelectColumnFilter,
        filter: 'fuzzyText',

      },
      {
        Header: 'Ação',
        accessor: 'IdInterno',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          <Link to={{ pathname: `/employee-form/${value}` /* state: { value } */ }}>
            <button type="button">
              Ver
            </button>
          </Link>
        ),
      },

    ],
    [],
  );

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Colaborador[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await trueApi.get('/colaborador/selecionarTodos');
        setData(response.data.lista);
      } catch {
        toast.error('Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bunzl | Colaboradores</title>
      </Helmet>
      <Title title="Colaboradores" />
      <Table columns={columns} data={data} fields={employeesField} />
    </>
  );
};
