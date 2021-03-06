import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useTable, useFilters, useColumnOrder, useSortBy, usePagination, useGlobalFilter, useRowSelect } from 'react-table';
import { useLocation } from 'react-router';
import { Container, None, ArrowUpDown } from './styles';
import { Button } from '../Button';
import { SearchBar } from '../SearchBar';
import { Input } from '../Input';
import { ModalTable } from '../ModalTable';
import { useNotificacaoContext } from '../../hooks/useNotification';

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, ...rest },
}) {
  const count = preFilteredRows.length;

  return (
    <None />
  );
}
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);

export const Table = ({ data, columns, fields, ...rest }) => {
  const [showDrag, setShowDrag] = useState(false);
  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
          : true;
      }),
    }),
    [],
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageCount,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    nextPage,
    previousPage,
    gotoPage,
    setPageSize,
    setColumnOrder,
    visibleColumns,
    globalFilter,
    setGlobalFilter,
    preGlobalFilteredRows,
    state: { pageIndex, pageSize, virtue },

    manualFilters: Bool,
  } = useTable({
    columns,
    data,
    filterTypes,
    defaultColumn,
    initialState: { pageIndex: 0,
      pageSize: 30,
      sortBy: [{ id: columns[0], desc: true }],
      hiddenColumns: columns.map(column => {
        if (column.show === false) return column.accessor || column.id;
      }),
    },

  },
  useFilters,
  useGlobalFilter,
  useColumnOrder,
  useSortBy,
  usePagination);

  const { pathname } = useLocation();

  return (

    <Container>
      <SearchBar
        columns={columns}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        GlobalFilter={globalFilter}
        searchFields={fields}
        headerGroups={headerGroups}
      />
      <div id="buttonContainer">
        {
          pathname === '/requests' &&
          (
          <div id="printButton">
            <Button id="print" disabled>Imprimir</Button>
          </div>
          )
        }
        {
          (pathname === '/requests' && rest?.atendimentosCounter > 0) &&
          (
          <div id="refreshContainer">
            <Button id="refreshButton" onClick={() => rest.refreshRequests() }>{`${rest?.atendimentosCounter} novos atendimentos em espera`}</Button>
          </div>
          )
        }
      </div>
      <table {...getTableProps()}>
        <thead>
          {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
         <tr {...headerGroup.getHeaderGroupProps()}>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             <th
               width={column.width}
               {...column.getHeaderProps(column.getSortByToggleProps())}
               className={
                // eslint-disable-next-line no-nested-ternary
                column.isSorted
                  ? column.IsSortedDesc
                    ? 'sor-desc'
                    : 'sort-desc'
                  : ''
             }
             >
               {// Render the header
               column.render('Header')
  }            <span>
    {headerGroup.headers[headerGroup.headers.length - 1] !== column ? <ArrowUpDown /> : <></>}
               </span>
             </th>
           ))
}
         </tr>
       ))
}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
       page.map(row => {
         // Prepare the row for display
         prepareRow(row);
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell =>
               // Apply the cell props
               (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')
}
                 </td>
               ))
}
           </tr>
         );
       })
}
        </tbody>
      </table>

      <div className="pagination">
        <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          P??gina{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Ir para:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
      <ModalTable listColumns={visibleColumns} modifyColumns={setColumnOrder} showDrag={showDrag} setShowDrag={setShowDrag} />
    </Container>
  );
};
