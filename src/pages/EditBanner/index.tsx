/* eslint-disable arrow-body-style */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useMatch, useParams } from 'react-router-dom';
import { trueApi } from '../../services/api';

import { Content } from './styles';
import { Title } from '../../components/Title';
import { ImageInput } from '../../components/ImageInput';
import { Input } from '../../components/Input';
import { messages } from '../../utils/statusMessage';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { dateHourToString } from '../../utils/dateConversion';

const FormData = require('form-data');

export interface BannerData {
  IdInterno: number;
  Ordem: string;
  StatusBanner: number;
  Titulo: string;
  Conteudo: string;
  ArquivoImagem: string;
  Id: number;

}

export function EditBanner() {
  const formRef = useRef<FormHandles>(null);
  const [bannerData, setBannerData] = useState<BannerData>({} as BannerData);

  let { id } = useParams();

  const userId = sessionStorage.getItem('id');

  useEffect(() => {
    async function getBanner() {
      try {
        const { data } = await trueApi.get(`/banner/Selecionarum/?idBanner=${id}`);
        if (data.Status) {
          setBannerData({
            ...data.Banner,
            DataInicioF: dateHourToString(data.Banner.DataInicio),
            DataTerminoF: dateHourToString(data.Banner.DataTermino),
          });
        }
      } catch {
        toast.error('Erro ao buscar dados');
      }
    }

    getBanner();
  }, []);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const form = new FormData();

      if (data.profileImage) { form.append('Imagem', data.profileImage); }
      form.append('Descricao', data.Descricao);
      form.append('DataInicio', data.DataInicio.replace('-', '/'));
      form.append('DataTermino', data.DataFim.replace('-', '/'));
      form.append('Usuario', userId);
      form.append('LinkDestino', data.Link);
      form.append('StatusBanner', data.Status);
      form.append('IdInterno', id);
      const response = await trueApi.put('/banner/atualizarBanner/', form, { headers: form.getHeaders });

      if (response.data.Status) {
        toast.success('Pergunta atualizada com sucesso!');
      }
    } catch (error) {
      toast.error('Error ao atualizar pergunta');
    }
  }, []);

  return (
    <Content>
      <Title title="Gerenciamento de FAQ" backButton />
      <h2>Editar</h2>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >

        <div id="banner-info">
          <Input
            name="ID"
            label="ID"
            defaultValue={bannerData.Id}
          />
          <Input
            name="Ordem"
            label="Ordem"
            defaultValue={bannerData.Ordem}

          />
          <Input
            name="Título"
            label="Título"
            defaultValue={bannerData.Titulo}
          />
          <Input
            name="Conteúdo"
            label="Conteúdo"
            defaultValue={bannerData.Conteudo}
          />
          <Select
            options={messages.StatusBanner}
            name="Status"
            label="Status"
            selected={bannerData.StatusBanner}
          />
        </div>

        <div id="button">
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
    </Content>
  );
}
