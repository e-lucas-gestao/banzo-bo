/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container } from './styles';
import { useNotificacaoContext } from '../../hooks/useNotification';

interface SearchBarProps {
  setFilter?: any;
  columns?: any
  searchFields: any;
  useFilters?: any;
  preGlobalFilteredRows?:any;
  globalFilter?: any;
  setGlobalFilter?: any;
  headerGroups?: any;
  selectButton?:any;

}

export function SearchBar({
  searchFields,
  columns,
  useFilters,
  setGlobalFilter,
  globalFilter,
  preGlobalFilteredRows,
  headerGroups,
  selectButton,
  ...rest }
  : SearchBarProps) {
  const formRef = useRef<FormHandles>(null);

  const { clientes,
    editarCliente } = useNotificacaoContext();

  return (
    <Container pushNotification={selectButton}>
      {
      !selectButton && (
      <div id="title">
        <h3>Pesquisar</h3>
      </div>
      )
      }

      <div id="input">
        <Form
          id="push-form"
          ref={formRef}
          onSubmit={() => 'oi'}
        >
          {headerGroups?.map((headerGroup: any) =>
            headerGroup.headers.map((column: any) => {
              if (column.filter) {
                return column.canFilter ? <div>{column.render('Filter')}</div> : null;
              }
            }))}

          {selectButton && (

          <div>
            <label htmlFor="checkbox-colaboradores">
              <div>
                <p>Todos os colaboradores?</p>
              </div>

            </label>
            <input
              id="checkbox-colaboradores"
              disabled={(clientes.selecionado === undefined ||
                 Object.getOwnPropertyNames(clientes).length === 0)}
              checked={clientes[clientes.selecionado]?.todos ||
                false}
              type="checkbox"
              onChange={() => {
                editarCliente({ idCliente: clientes.selecionado },
                  !clientes[clientes.selecionado].todos);
              }}
            />
          </div>
          )}

          {/* <Button>Buscar</Button> */}
        </Form>
      </div>
    </Container>
  );
}
