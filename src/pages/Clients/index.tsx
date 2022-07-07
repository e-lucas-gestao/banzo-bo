import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Input } from '../../components/InputDown';
import { Table } from '../../components/Table/index.js';
import { trueApi } from '../../services/api';
import { clientsFields } from '../../utils/searchFields';
import { Title } from '../../components/Title';
import { capitalizeString } from '../../utils/stringFormat';

interface Data {
    Id: number,
    CdCliente: number,
    Status: number,
    RazaoSocial: string,
    CNPJ:string,
    Telefone?: string,
    Email?: string,
    Cidade?: string,
    Nome?: string,
    Tipo?: string,
}

export const Clients: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Código',
        accessor: 'CdCliente', // accessor is the "key" in the data
        Filter: Input,
        filter: 'fuzzyText',
        width: 100,
      },
      {
        Header: 'Razão Social',
        accessor: 'RazaoSocial',
        Filter: Input,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => (value ? capitalizeString(value.replace(/_/g, ' ')) : 'Indisponível'),
      },
      {
        Header: 'CNPJ',
        accessor: 'cnpj',
        Filter: Input,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Indisponível' }</span>,
      },
      {
        Header: 'E-mail',
        accessor: 'Email',
        Filter: Input,
        filter: 'fuzzyText',
        width: 300,
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Indisponível' }</span>,
      },

      {
        Header: 'Tipo de empresa',
        accessor: 'Tipo',
        Filter: Input,
        filter: 'fuzzyText',
        width: 300,
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Indisponível' }</span>,
      },

      {
        Header: 'Ação',
        accessor: 'Id',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          <Link to={{ pathname: `/client-form/${value}` /* state: { value } */ }}>
            <button type="button">
              Ver
            </button>
          </Link>
        ),
      },

    ],
    [],
  );

  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await trueApi.get('/cliente/SelecionarTodos?pageNumber=0&limit=99999');
        setData(response.data.Clientes);
      } catch {
        console.warn('Erro ao buscar dados');
      }
    }

    fetchClients();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bunzl | Empresa</title>
      </Helmet>
      <Title title="Empresa" />
      <Table columns={columns} data={data} fields={clientsFields} />
    </>
  );
};
