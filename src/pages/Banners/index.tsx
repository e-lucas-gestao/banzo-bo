import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Input } from '../../components/InputDown';
import { Table } from '../../components/Table/index.js';
import { trueApi } from '../../services/api';

import { Title } from '../../components/Title';
import { SelectColumnFilter } from '../../components/Select';

import { messages } from '../../utils/statusMessage';
import { clientsFields } from '../../utils/searchFields';
import { dateHourToStringFormatted } from '../../utils/dateConversion';
import { Status } from '../../components/Table/Status';

interface BannerData {
  IdInterno: number;
  Ordem: string;
  Titulo: string;
  ID: Number;
  Conteudo: string;
  Status: string;
}

export function Banners() {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID', // accessor is the "key" in the data
        Filter: Input,
        filter: 'fuzzyText',
        width: 100,
      },
      {
        Header: 'Ordem',
        accessor: 'Ordem', // accessor is the "key" in the data
        Filter: Input,
        filter: 'fuzzyText',
        width: 100,
      },
      {
        Header: 'Titulo',
        accessor: 'Titulo',
        Filter: Input,
        filter: 'fuzzyText',
      },
      {
        Header: 'Conteúdo',
        accessor: 'Conteudo',
        Filter: Input,
        filter: 'fuzzyText',
        width: 100,
      },
      {
        Header: 'Status',
        accessor: 'Status',
        Filter: Input,
        filter: 'fuzzyText',
        width: 100,
      },
      {
        Header: 'Ação',
        accessor: 'IdInderno',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          <div id="action">
            <Link to={{ pathname: `/edit-banner/${value}` /* state: { value } */ }}>
              <button type="button">

                Alterar
              </button>
            </Link>
            <button className="action" type="button">
              Excluir
            </button>
          </div>
        ),
      },

    ],
    [],
  );

  const [banners, setBanners] = useState<BannerData[]>([]);

  useEffect(() => {
    async function getBannersData() {
      try {
        const formattedData : BannerData[] = [{
          ID: 5,
          Ordem: '2',
          Titulo: 'renato',
          Conteudo: 'Estou tentando finalizar tal tela',
          Status: 'Aguardando',
          IdInterno: 13,
        }];

        setBanners(formattedData);
      } catch {
        toast.error('Erro ao carregador os dados.');
      }
    }
    getBannersData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Bunzl | FAQ</title>
      </Helmet>
      <Title title="Gerenciamento de FAQ" addButton="create-banner" />
      <Table columns={columns} data={banners} fields={clientsFields} />
    </>
  );
}
