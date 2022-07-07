/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React, { SelectHTMLAttributes, useState, useCallback, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, ContainerWrapper } from './styles';
import { trueApi } from '../../services/api';
import { useNotificacaoContext } from '../../hooks/useNotification';
import { messages } from '../../utils/statusMessage';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  name: string;
  options: any;
  selected?: any;
  label?: string;
}

interface optionsProps {
  column: any;
  filterValue: any;
  setFilter: any;
  id: any;
}

export function Select({ name, options, selected, label, ...rest }: SelectProps) {
  const inputRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <ContainerWrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <Container>
        <select required {...rest} ref={inputRef}>
          <option>{'  '}</option>
          {
          options.map((option:any, index:any) => (
            <option
              value={option.value}
              selected={option.value === selected}
            >
              {option.message}
            </option>
          ))
        }
        </select>
      </Container>
    </ContainerWrapper>
  );
}

export function SelectColumnFilter({
  column: { Header, filterValue, setFilter, id } }:optionsProps) {
  return (
    <ContainerWrapper>
      <Container>
        <select
          value={filterValue}
          onChange={e => {
            setFilter(e.target.value || undefined);
          }}
        >
          <option value="">{Header}</option>
          {messages[id] && messages[id].map((status:any) => (
            <option key={`id-${status.value}`} value={status.value}>
              {status.message}
            </option>
          ))}
        </select>
      </Container>
    </ContainerWrapper>
  );
}

export function SelectClienteNotificacaoPush({
  column: { filterValue, setFilter, preFilteredRows, id, label },
}:optionsProps) {
  const {
    adicionarCliente,
  } = useNotificacaoContext();
  const [clientList, setClienteList] = useState<any>();
  useEffect(() => {
    trueApi.get('/cliente/SelecionarTodos?pageNumber=0&limit=99999').then(response => setClienteList(response.data.Clientes));
  },
  []);

  const options:any = React.useMemo(() => {
    const opt = new Set();
    preFilteredRows.forEach((row: { values: { [x: string]: any; }; }) => {
      opt.add(row.values[id]);
    });
    return [...opt.values()];
  }, [id, preFilteredRows]);

  function handleValue(target:any) {
    setFilter(target.value || undefined);
    const filtroCliente = clientList.filter(
      (item: { RazaoSocial: any; }) => item.RazaoSocial === target.value,
    );

    adicionarCliente(
      { idCliente: filtroCliente[0]?.Id },
    );
  }
  return (
    <ContainerWrapper>
      {label && <label htmlFor="opicao-cliente">Seleção de clientes</label>}
      <Container>
        <select
          value={filterValue}
          onChange={e => {
            handleValue(e.target);
          }}
        >

          <option id="opicao-cliente" value="">Selecionar Cliente</option>
          {options.map((status:any) => (
            <option key={status} value={status}>

              {status}
            </option>
          ))}
        </select>
      </Container>
    </ContainerWrapper>
  );
}
