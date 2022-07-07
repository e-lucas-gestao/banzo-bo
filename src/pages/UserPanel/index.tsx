import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { trueApi } from '../../services/api';
import { userPanelFields } from '../../utils/searchFields';

import { SelectColumnFilter } from '../../components/Select';
import { Input, InputDown } from '../../components/InputDown';
import { Table } from '../../components/Table/index.js';
import { Title } from '../../components/Title';
import { Status } from '../../components/Table/Status';

import { Content } from './styles';

export interface Usuario {
  Nome: string;
  email: string;
  Status: number;
  Id?: number;
  CaminhoImg: string;
  Empresa: string;
}

export const UserPanel: React.FC = () => {
  const [data, setData] = useState<Usuario[]>([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'Nome', // accessor is the "key" in the data
        Filter: Input,
        filter: 'fuzzyText',

      },
      {
        Header: 'E-mail',
        accessor: 'email',
        Filter: Input,
        filter: 'fuzzyText',
      },
      {
        Header: 'Status',
        accessor: 'Status',
        width: 60,
        Filter: SelectColumnFilter,
        filter: 'fuzzyText',
        Cell: ({ cell: { value }, column: { id } } : any) =>
          <Status value={value} id={id} />,
      },
      {
        Header: 'Ação',
        accessor: 'Id',
        Cell: ({ cell: { value } }: any) => (
          <Link to={{ pathname: `/user-form/${value}` /* state: { value } */ }}>
            <button type="button">
              Ver
            </button>
          </Link>
        ),
        width: 40,
      },
    ],
    [],
  );

  useEffect(() => {
    trueApi.post('/usuario/selecionar/?page=0&limit=99999999', { }).then(response => setData(response?.data?.lista || []));
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Bunzl | Usuários Backoffice</title>
      </Helmet>
      <Title title="Usuários" addButton="create-user" />
      <Table fields={userPanelFields} columns={columns} data={data} />
    </Content>
  );
};
