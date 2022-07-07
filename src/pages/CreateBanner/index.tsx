/* eslint-disable arrow-body-style */
import { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import { trueApi } from '../../services/api';
import { messages } from '../../utils/statusMessage';

import { Title } from '../../components/Title';
import { ImageInput } from '../../components/ImageInput';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';

import { Content } from './styles';

const FormData = require('form-data');

export interface Permission {
  Tipo: any;
  Nome: string;
  Funcionalidade: any;
  Id: string;
  CdFuncionalidade: string;
}

export function CreateBanner() {
  const formRef = useRef<FormHandles>(null);
  const id = sessionStorage.getItem('id');
  let response:any;

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const form = new FormData();
      form.append('Imagem', data.profileImage);
      form.append('Descricao', data.Descricao);
      form.append('DataInicio', data.DataInicio.replace('-', '/'));
      form.append('DataTermino', data.DataFim.replace('-', '/'));
      form.append('Usuario', id);
      form.append('LinkDestino', data.Link);
      form.append('StatusBanner', data.Status);

      response = await trueApi.post('/banner/inserirBanner', form, { headers: form.getHeaders });

      if (!response.data.Status) throw Error;

      toast.success('Pergunta criada com sucesso!');
      if (formRef.current) {
        formRef.current.reset();
        formRef.current.clearField('profileImage');
      }
    } catch (error) {
      if (!response.data.Status) {
        toast.error('Erro ao criar Pergunta!');
      }
    }
  }, []);

  return (
    <Content>
      <Title title="Gerenciamento de FAQ" backButton />
      <h2>Criar</h2>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >

        <div id="banner-info">
          <Input
            name="ID"
            label="ID"
          />
          <Input
            name="ordem"
            label="Ordem"
          />
          <Input
            name="titulo"
            label="Título"

          />
          <Input
            name="conteudo"
            label="Conteúdo"
          />
          <Select
            options={messages.statusUsuario}
            selected={1}
            name="Status"
            label="Status"
          />

        </div>

        <div id="button">
          <Button type="submit">Adicionar</Button>
        </div>
      </Form>
    </Content>
  );
}
