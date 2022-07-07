/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { FormHandles } from '@unform/core';

import { trueApi } from '../../services/api';
import { notificacaoColaboradores } from '../../utils/searchFields';
import { useNotificacaoContext } from '../../hooks/useNotification';

// eslint-disable-next-line import/extensions
import { TableCheckList } from '../../components/TableCheckList';
import { Title } from '../../components/Title';
import { Input } from '../../components/Input';
import { SelectClienteNotificacaoPush } from '../../components/Select';
import { Button } from '../../components/Button';

import { Content } from './styles';

export function CreateNotificationPushForm() {
  const formRef = useRef<FormHandles>(null);
  const [todosClientes, setTodosClientes] = useState(true);
  const [supervisorList, setSupervisorList] = useState([] as any);

  const {
    clientes,
  } = useNotificacaoContext();

  useEffect(() => {
    async function getSupervisores() {
      const { data } = await trueApi.get('/colaborador/selecionarTodos');
      const colaboradores = data.lista;
      setSupervisorList(
        colaboradores.filter((item: { Tipo: any; }) => item.Tipo === 1 && item.hasOwnProperty('ExpoPushToken')),
      );
    }
    getSupervisores();
  }, []);

  const formatarClientes = () => {
    const properties = Object.getOwnPropertyNames(clientes);
    properties.pop();
    const idClientes = properties.filter(cliente =>
      clientes[cliente].todos || clientes[cliente].colaboradores.length > 0);
    return idClientes?.map((idCliente) => {
      const todos = clientes[idCliente].todos ? 1 : 0;
      return {
        Cliente: { id: Number(idCliente) },
        TodosColaboradores: todos,
        ListaColaboradores: todos === 1 ? null :
          clientes[idCliente].colaboradores.map((idColab: any) => ({ idInterno: idColab })),
      };
    });
  };

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const formatedUserData = {
        Titulo: data.Titulo,
        Mensagem: data.Mensagem,
        DataEnvio: `${data.Data.replaceAll('-', '/')} ${data.Hora}:00`,
        TodosClientes: todosClientes ? 1 : 0,
        Clientes: todosClientes ? null : formatarClientes(),
        Usuario: sessionStorage.getItem('id'),
      };

      const response = await trueApi.post('/push/inserirPush', { ...formatedUserData });

      if (!response.data.Status) throw Error;
      toast.success('Notificação criada com sucesso!');
      if (formRef.current) formRef.current.reset();
    } catch (error) {
      toast.error('Error ao criar notificação! Verifique se os Clientes foram selecionados corretamente.');
    }
  }, [todosClientes, clientes]);

  const columns = useMemo(
    () => [
      {
        Header: 'Cliente',
        accessor: 'NomeCliente',
        Filter: SelectClienteNotificacaoPush,
        filter: 'fuzzyText',
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Dado indisponível' }</span>,
      },
      {
        Header: 'Nome',
        accessor: 'Nome', // accessor is the "key" in the data

        width: 300,
      },
      {
        Header: 'RE',
        accessor: 'Re',

        width: 50,
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Dado indisponível' }</span>,
      },
      {
        Header: 'E-mail',
        accessor: 'Email',

        width: 300,
        Cell: ({ cell: { value } }: any) => <span>{ value || 'Dado indisponível' }</span>,
      },
      {
        Header: 'Tipo Colaborador',
        accessor: 'Tipo',
        Cell: ({ cell: { value } }: any) => <span>{ value === 0 ? 'Colaborador Padrão' : 'Supervisor' }</span>,
        filter: 'fuzzyText',

      },
    ],
    [],
  );

  return (
    <Content>
      <Title title="Notificações Push" backButton />
      <h2>Criar</h2>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div id="message-box">
          <Input
            required
            name="Titulo"
            label="Título"
          />
          <Input
            required
            name="Mensagem"
            label="Mensagem"
          />
        </div>

        <div id="info-cliente">
          <Input
            required
            name="Data"
            label="Data"
            type="date"
            min={new Date().toISOString().slice(0, -14)}
          />
          <Input
            required
            name="Hora"
            label="Hora"
            type="time"
          />
          <div id="checkbox-clientes">

            <label htmlFor="checkbox-cliente">
              <div>
                Todos os clientes?
              </div>

            </label>
            <input
              onChange={() => setTodosClientes(!todosClientes)}
              checked={todosClientes}
              type="checkbox"
              name="Todos clientes"
              id="checkbox-cliente"
            />

          </div>
        </div>
        { (!todosClientes) && (
          <div>
            <TableCheckList
              columns={columns}
              data={supervisorList}
              fields={notificacaoColaboradores}
            />
          </div>
        ) }

        <div id="button">
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
    </Content>
  );
}
