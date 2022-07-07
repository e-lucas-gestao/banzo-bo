/* eslint-disable no-prototype-builtins */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { trueApi } from '../../services/api';
import { useNotificacaoContext } from '../../hooks/useNotification';
import { notificacaoColaboradores } from '../../utils/searchFields';

import { Title } from '../../components/Title';
import { Input } from '../../components/Input';
import { SelectClienteNotificacaoPush } from '../../components/Select';
import { Button } from '../../components/Button';
import { TableCheckList } from '../../components/TableCheckList/index.js';
import { MensagemPush } from '../NotificationsPush';

import { Content } from './styles';

interface FormattedMessages extends MensagemPush {
  DateF: string;
  HourF: string;
}

export function NotificationPushForm() {
  const formRef = useRef(null);
  let { id }: any = useParams();

  const [todosClientes, setTodosClientes] = useState<boolean>();
  const [supervisorList, setSupervisorList] = useState([] as any);
  const [notificationData, setNotificationData] = useState({} as FormattedMessages);

  const {
    clientes,
    modificarColaboradoresForm,
  } = useNotificacaoContext();

  useEffect(() => {
    async function getNotificacao() {
      const { data } = await trueApi.get(`/push/Selecionarum/?idPush=${id}`);
      const Notificacao = data.Push;
      const formattedData = {
        ...Notificacao,
        DateF: Notificacao.DataEnvio.slice(0, 10),
        HourF: Notificacao.DataEnvio.slice(11, 16),
      };
      setNotificationData(formattedData);
      setTodosClientes(Notificacao.TodosClientes === 1);

      const ClientesRecarregados = Notificacao.Clientes;

      ClientesRecarregados?.map((
        item:{Cliente:{Id:Number}, ListaColaboradores:[], TodosColaboradores:Number},
      ):void => {
        let idCliente = { idCliente: item.Cliente.Id };

        let boolTodosColaboradores = item.TodosColaboradores === 1;

        modificarColaboradoresForm(item.ListaColaboradores?.map((lista:{IdInterno:any}) => (
          { colaborador: lista.IdInterno })), idCliente, boolTodosColaboradores);
      });
    }
    getNotificacao();
  }, []);

  useEffect(() => {
    async function getSupervisores() {
      const { data } = await trueApi.get('/colaborador/selecionarTodos');
      const colaboradores = data.lista;
      setSupervisorList(colaboradores.filter((item: { Tipo: any; }) => (item.Tipo === 1 && item.hasOwnProperty('ExpoPushToken'))));
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
        IdInterno: id,
        Titulo: data.Titulo,
        Mensagem: data.Mensagem,
        DataEnvio: `${data.Data.replaceAll('-', '/')} ${data.Hora}:00`,
        TodosClientes: todosClientes ? 1 : 0,
        Clientes: todosClientes ? null : formatarClientes(),
        Usuario: sessionStorage.getItem('id'),

      };
      const response = await trueApi.put('/push/atualizarPush', { ...formatedUserData });

      if (!response.data.Status) throw Error;
      toast.success('Notificação Atualizada com sucesso!');
    } catch (error) {
      toast.error('Error ao criar notificação!');
    }
  }, [todosClientes, clientes]);

  const columns = React.useMemo(
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
      <h2>Editar</h2>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div id="message-box">
          <Input
            required
            name="Titulo"
            label="Título"
            defaultValue={notificationData.Titulo}
          />
          <Input
            required
            name="Mensagem"
            label="Mensagem"
            defaultValue={notificationData.Mensagem}
          />
        </div>

        <div id="info-cliente">
          <Input
            name="Data"
            label="Data"
            type="date"
            min={new Date().toISOString().slice(0, -14)}
            defaultValue={notificationData.DateF}
          />
          <Input
            name="Hora"
            label="Hora"
            type="time"
            defaultValue={notificationData.HourF}
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
        {!todosClientes && (
          <div>
            <TableCheckList
              columns={columns}
              data={supervisorList}
              fields={notificacaoColaboradores}
            />
          </div>
        )}

        <div id="button">
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
    </Content>
  );
}
