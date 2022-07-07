/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SelectColumnFilter } from '../../components/Select';

import { notificationsPushFields } from '../../utils/searchFields';
import { messages } from '../../utils/statusMessage';

import { Content } from './styles';
import { Table } from '../../components/Table/index.js';
import { trueApi } from '../../services/api';
import { Title } from '../../components/Title';
import { InputDown } from '../../components/InputDown';

export interface MensagemPush {
  Titulo: string;
  Mensagem: string;
  Data: Date;
  Status: number;
  Id?: number;
}

export const NotificationsPush: React.FC = () => {
  const [dataTable, setDataTable] = useState<MensagemPush[]>([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Título',
        accessor: 'Titulo', // accessor is the "key" in the data
        Filter: InputDown,
        filter: 'fuzzyText',

      },
      {
        Header: 'Mensagem',
        accessor: 'Mensagem', // accessor is the "key" in the data
        Filter: InputDown,
        filter: 'fuzzyText',

      },
      {
        Header: 'Data',
        accessor: 'DataEnvio',
        Filter: InputDown,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{`Dia ${value.replace('T', ' às ').slice(0, 19)}`}</span>,
      },
      {
        Header: 'Status',
        accessor: 'StatusPush',
        Filter: SelectColumnFilter,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{messages.StatusPush[value].message}</span>,
      },
      {
        Header: 'Ação',
        accessor: 'IdInterno',
        Cell: ({ cell: { value } }: any) => (
          <Link to={{ pathname: `/notifications-form/${value}` /* state: { value } */ }}>
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
    async function getSupervisores() {
      try {
        const { data } = await trueApi.get('/push/SelecionarTodos/?pageNumber=0&limit=0');
        const notificacoes = data.Pushs;
        if (!data.Status) throw new Error(data.Message);
        setDataTable(notificacoes);
      } catch (err) {
        console.warn(err);
      }
    }
    getSupervisores();
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Bunzl | Notificação Push</title>
      </Helmet>
      <Title title="Notificações Push" addButton="create-notification" />
      <Table fields={notificationsPushFields} columns={columns} data={dataTable} />

    </Content>
  );
};
