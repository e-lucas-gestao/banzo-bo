/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useState, createContext, useContext } from 'react';
import { number, object } from 'yup/lib/locale';

interface NotificacaoData {
    clientes: any;
    setClientes: any;
    clientesSelecionado: any;
    setClientesSelecionado:any;
    supervisores: any;
    setSupervisores: any;
    supervisoresSelecionados: any;
    setSupervisoresSelecionados: any;
  }

const ListaNotificacao = createContext<NotificacaoData>({} as any);

export default function ListaNotificacaoProvider({ children }:any) {
  const [clientes, setClientes] = useState<any>({
    selecionado: undefined } as any);
  const [clientesSelecionado, setClientesSelecionado] = useState<any>({} as any);
  const [supervisores, setSupervisores] = useState<any>([] as any);
  const [supervisoresSelecionados, setSupervisoresSelecionados] = useState<any>([] as any);

  return (
    <ListaNotificacao.Provider value={{
      clientes,
      setClientes,
      clientesSelecionado,
      setClientesSelecionado,
      supervisores,
      setSupervisores,
      supervisoresSelecionados,
      setSupervisoresSelecionados,
    }}
    >
      {children}
    </ListaNotificacao.Provider>
  );
}

export function useNotificacaoContext() {
  const {
    clientes,
    setClientes,
    supervisores,
    setSupervisores,
    supervisoresSelecionados,
    setSupervisoresSelecionados,
  } = useContext(ListaNotificacao);

  const checarCliente = (dadoCliente:any) => {
    const propriedades = Object.getOwnPropertyNames({ ...clientes });
    return propriedades.includes(String(dadoCliente.idCliente));
  };

  const adicionarCliente = (dadoCliente:any) => {
    let listaClientes = { ...clientes };
    if (dadoCliente.idCliente !== undefined) {
      if (!checarCliente(dadoCliente)) {
        listaClientes[dadoCliente.idCliente] = { todos: false, colaboradores: [] };
      }
    }

    listaClientes.selecionado = dadoCliente.idCliente;
    setClientes(listaClientes);
  };

  const editarCliente = (dadoCliente:any, todos: any) => {
    let listaClientes = { ...clientes };

    if (checarCliente(dadoCliente)) {
      listaClientes[dadoCliente.idCliente].todos = todos;
    } else listaClientes[dadoCliente.idCliente] = { todos, colaboradores: [] };

    listaClientes.selecionado = dadoCliente.idCliente;
    setClientes(listaClientes);
  };

  function modificarColaboradores(linhasSelecionadas : any) {
    const clientesGeral = { ...clientes };
    const clienteSelected = clientesGeral.selecionado;
    if (clienteSelected !== undefined) {
      const IdsupNovos = linhasSelecionadas.map(
        (linha: { colaborador: any; }) => linha.colaborador,
      );

      const supAntigos = [...(clientesGeral[clienteSelected].colaboradores)]
        .filter(id => IdsupNovos.includes(id));

      clientesGeral[clienteSelected].colaboradores =
        [...supAntigos, ...IdsupNovos.filter((idNovo: any) => !supAntigos.includes(idNovo))];

      setClientes(clientesGeral);
    }
  }
  function modificarColaboradoresForm(linhasSelecionadas :any,
    cliente:any, todosColaboradores:any) {
    const clientesGeral = { ...clientes };

    if (checarCliente(cliente)) {
      clientesGeral[cliente.idCliente].todos = todosColaboradores;
    } else clientesGeral[cliente.idCliente] = { todosColaboradores, colaboradores: [] };

    if (!todosColaboradores) {
      const linhas = linhasSelecionadas;
      if (linhas !== undefined) {
        const IdsupNovos = linhas.map((i: { colaborador: any; }) => i.colaborador);

        clientesGeral[cliente.idCliente].colaboradores = IdsupNovos;
      }
    }
    setClientes(clientesGeral);
  }

  return {
    clientes,
    setClientes,
    adicionarCliente,
    editarCliente,
    modificarColaboradoresForm,
    modificarColaboradores,
    supervisores,
    setSupervisores,
    supervisoresSelecionados,
    setSupervisoresSelecionados,
  };
}
