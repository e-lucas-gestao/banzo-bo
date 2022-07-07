import { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useParams } from 'react-router-dom';
import { trueApi } from '../../services/api';
import { Content, Container } from './styles';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ImageInput } from '../../components/ImageInput';

import { Title } from '../../components/Title';

export interface Cliente {
    Id: number,
    CdCliente: number,
    RazaoSocial?: string,
    Status?: number,
    Nome?: string,
    CNPJ?: string,
    Email?: string,
    Cidade?: string,
    Tipo?: string;

}

export function ClientForm() {
  const { id } = useParams();

  const [clientDada, setClientDada] = useState<Cliente>({} as Cliente);

  useEffect(() => {
    trueApi.get(`/cliente/SelecionarUm/?idCliente=${id}`).then(response => setClientDada(response.data.Cliente));
  }, []);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data:object) => console.log('teste'), []);

  return (
    <>
      <Title title="Empresa" backButton />
      <Content>
        <h2>Visualizar</h2>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h3 className="gray">Dados da empresa</h3>
          <div id="info-solicitacao">
            <Input
              name="Nome"
              label="Nome"
              value={clientDada?.Nome}
            />
            <Input
              name="RazaoSocial"
              label="Razão social"
              value={clientDada?.RazaoSocial}
            />
            <Input
              name="Cnpj"
              label="CNPJ"
              value={clientDada?.CNPJ}
            />
            <Input
              name="Email"
              label="E-mail"
              value={clientDada?.Email}
            />
            <Input
              name="Tipo"
              label="Tipo de empresa"
              value={clientDada?.Tipo}
            />
            <Input
              name="Status"
              label="Status"
            />
          </div>

          <h3 className="gray">Dados de contato</h3>
          <div id="info-cliente">
            <Input
              name="Nome"
              label="Nome"
            />
            <Input
              name="Email"
              label="E-mail"

            />
            <Input
              name="Telefone"
              label="Telefone"
            />
          </div>
          <h3 className="gray">Endereço comercial</h3>
          <div id="status-pedido">
            <Input
              name="cep"
              label="CEP"
            />
            <Input
              name="Endereco"
              label="Endereço"

            />
            <Input
              name="Numero"
              label="Numero"

            />
            <Input
              name="Complemento"
              label="Complemento"

            />
            <Input
              name="Bairo"
              label="Bairro"

            />
            <Input
              name="Cidade"
              label="Cidade"

            />
            <Input
              name="Estado"
              label="Estado"

            />

          </div>

        </Form>
      </Content>
    </>
  );
}
