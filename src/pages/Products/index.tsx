import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { trueApi } from '../../services/api';
import { productsFields } from '../../utils/searchFields';

import { Table } from '../../components/Table/index.js';
import { Status } from '../../components/Table/Status';

import { InputDown } from '../../components/InputDown';
import { Title } from '../../components/Title';
import { SelectColumnFilter } from '../../components/Select';
import { capitalizeString } from '../../utils/stringFormat';

export interface Data {
  Id: number,
  Id_interno: number,
  Coligada: number,
  CdFamilia: string,
  Familia: string,
  NrCdProduto: string,
  Categoria: string,
  CategoriaCod: string,
  SubcategoriaCod: string,
  Subcategoria: string,
  Ativo: number,
  Descricao: string,
  CaminhoImagem: string,
}

export const Products: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [filters, setFilters] = useState({
    Nome: '',
    Subcategoria: '',
    Categoria: '',
    Ativo: '',
  });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Código do produto',
        accessor: 'NrCdProduto', // accessor is the "key" in the data
        Filter: InputDown,
        filter: 'fuzzyText',
      },
      {
        Header: 'Nome do produto',
        accessor: 'Descricao',
        Filter: InputDown,
        filter: 'fuzzyText',
        width: 300,
        Cell: ({ cell: { value } }: any) => <span>{ capitalizeString(value) || 'Indisponível' }</span>,
      },
      {
        Header: 'Categoria',
        accessor: 'Categoria',
        Filter: InputDown,
        filter: 'fuzzyText',
      },
      {
        Header: 'SubCategoria',
        accessor: 'Subcategoria',
        Filter: InputDown,
        filter: 'fuzzyText',
      },
      {
        Header: 'Status',
        accessor: 'Ativo',
        Filter: SelectColumnFilter,
        filter: 'fuzzyText',
        Cell: ({ cell: { value }, column: { id } } : any) =>
          <Status value={value} id={id} />,
      },
      {
        Header: 'Ação',
        accessor: 'IdInterno',
        width: 50,
        Cell: ({ cell: { value } }: any) => (
          <Link to={{ pathname: `/product-form/${value}` }}>
            <button type="button">
              Ver
            </button>
          </Link>
        ),
      },

    ],
    [],
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await trueApi.post('/produto/selecionarPaginado/?pageNumber=0&limit=9999', {});
        setData(response.data.lista);
      } catch {
        toast.error('Erro ao buscar dados');
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>GR Supply | Produtos</title>
      </Helmet>
      <Title title="Produtos" />
      <Table columns={columns} data={data} fields={productsFields} />
    </>
  );
};
