import { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useParams } from 'react-router-dom';

import { capitalizeString } from '../../utils/stringFormat';
import { trueApi } from '../../services/api';

import { Input } from '../../components/Input';
import { Title } from '../../components/Title';
import { ImageInput } from '../../components/ImageInput';

import { Content } from './styles';

export interface Colaborador {
    IdInterno: number,
    Nome: string,
    Cpf: string,
    Re: string,
    Email: string,
    NomeCliente: string,
    Posto: string,
    Cargo: string,
    Area: string,
    Status: number,
    NrId: number,
    CdCliente: number,
    AreaSup: string,
    Endereco: string,
    Complemento: string,
    Bairro: string,
    Cidade: string,
    Numero: string,
    Estado: string,
    Tipo: number,
    FgExcluido: number
}

export function EmployeeForm() {
  let { id } = useParams();

  const [employeeData, setEmployeeData] = useState<Colaborador>({} as Colaborador);

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const response = await trueApi.post('/colaborador/selecionarUm/', { idInterno: id });
        if (!response.data.Status) throw new Error(response.data.Message);
        setEmployeeData(response.data.colaborador);
      } catch (err) {
        console.warn(err);
      }
    }

    fetchEmployeeData();
  }, []);

  const formRef = useRef<FormHandles>(null);

  return (
    <>
      <Title title="Colaboradores" backButton />
      <Content>
        <h2>Visualizar</h2>
        <Form
          ref={formRef}
          onSubmit={() => 'oi'}
        >

          <ImageInput inputType="usuarios" path="" disabled />

          <h3 className="gray">Dados pessoais</h3>
          <div id="info-solicitacao">
            <Input
              name="Nome"
              label="Nome completo"
              value={capitalizeString(employeeData.Nome)}
            />
            <Input
              name="Cpf"
              label="CPF"
              value={capitalizeString(employeeData.Cpf)}
            />
            <Input
              name="Nome_cliente"
              label="Empresa"
              value={capitalizeString(employeeData.NomeCliente)}
            />
            {/* <Input
              name="cnpj"
              label="Data de solicitação"
            /> */}
            <Input
              name="Re"
              label="RE"
              value={capitalizeString(employeeData.Re)}
            />
            <Input
              name="Posto"
              label="Posto"
              value={capitalizeString(employeeData.Posto)}
            />
            <Input
              name="Area"
              label="Area Operacional"
              value={capitalizeString(employeeData.Area?.replaceAll('_', ' '))}
            />
            {/* <Input
              name="Area"
              label="Centro de Custo"
            /> */}
            <Input
              name="Cargo"
              label="Cargo"
              value={capitalizeString(employeeData.Cargo?.replace('-', ''))}

            />
            <Input
              name="Supervisor"
              label="Supervisor"
            />
            <Input
              name="Status"
              label="Status Colaborador"
            />
          </div>

          <h3 className="gray">Acesso</h3>
          <div id="info-cliente">
            <Input
              name="Email"
              label="E-mail"
              value={employeeData.Email}
            />
          </div>
          <h3>Endereço residencial</h3>
          <div id="status-pedido">
            {/* <Input
              name="cep"
              label="CEP"
            /> */}
            <Input
              name="Endereco"
              label="Endereço"
              value={capitalizeString(employeeData.Endereco)}
            />
            <Input
              name="Numero"
              label="Numero"
              value={capitalizeString(employeeData.Numero)}
            />
            <Input
              name="Complemento"
              label="Complemento"
              value={capitalizeString(employeeData.Complemento)}
            />
            <Input
              name="Bairo"
              label="Bairro"
              value={capitalizeString(employeeData.Bairro)}
            />
            <Input
              name="Cidade"
              label="Cidade"
              value={capitalizeString(employeeData.Cidade)}
            />
            <Input
              name="Estado"
              label="Estado"
              value={employeeData.Estado}
            />

          </div>

        </Form>
      </Content>
    </>
  );
}
