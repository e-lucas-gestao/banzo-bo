/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import pessoa from '../../assets/pessoa.svg';
import empresa from '../../assets/empresa.svg';
import chatinfo from '../../assets/chatinfo.svg';
import { Container } from './styles';
import { Data } from '../../pages/RequestForm';
import { dateFullToString } from '../../utils/dateConversion';
import { trueApi } from '../../services/api';
import { Button } from '../Button';
import BackArrowIcon from '../../assets/arrow.svg';

interface IInformacoesModal{
  info : Data;
  cdAtendimento: number | undefined;
  CloseModal: () => void,
  BuscarAtendimentoInfo: (cdAtendimento: number | undefined) => void,
}
export default function Informacoes({ info,
  cdAtendimento, CloseModal, BuscarAtendimentoInfo }:IInformacoesModal) {
  const navigate = useNavigate();

  function handleSpan() {
    navigate('/requests');
  }
  const idUsuario = sessionStorage.getItem('id');

  // eslint-disable-next-line no-shadow
  async function IniciarAtendimento(cdAtendimento: number | undefined) {
    const iniciarResponse = await trueApi.put('/atendimento/start', { cdUsuario: idUsuario, cdAtendimento });

    if (iniciarResponse?.data?.status) {
      toast.success('Atendimento iniciado');
      BuscarAtendimentoInfo(cdAtendimento);
      CloseModal();
    } else {
      toast.error(iniciarResponse?.data?.message || 'Falha ao iniciar atendimento.');
    }
    console.log(iniciarResponse.data);
  }
  return (

    <Container>
      <div id="title">

        <button type="button" id="backButton" onClick={() => handleSpan()}><img src={BackArrowIcon} alt="Retornar para a página anterior" /></button>
        <h1>Dados da Chamada</h1>
      </div>
      <div id="solicitante">
        <img
          src={pessoa}
          id="pessoa"
          alt="cliente"
        />
        <h2>Solicitante:</h2>
      </div>
      <div id="dadosSolicitante">
        <h3 className="subTitle" id="cnpj">CNPJ:</h3>
        <h3 id="cnpj2">{info.cnpjCliente}</h3>
        <h3 className="subTitle" id="razao">Razão Social:</h3>
        <h3 id="razao2">{info.nomeGrupo}</h3>
        <h3 className="subTitle">Solicitante:</h3>
        <h3 id="solicitante2">{info.nomeCliente}</h3>
      </div>

      <div id="titleEmpresa">
        <img
          src={empresa}
          id="empresa1"
          alt="empresa prestadora"
        />
        <h1>Empresa Prestadora:</h1>
      </div>
      <div id="empresa">
        {/* <h3 id="cnpj">CNPJ</h3>
      <h3 id="cnpj">{info.}</h3> */}
        <h3 className="subTitle" id="razao">Razão Social:</h3>
        <h3 id="razao1">{info.nomeGrupo}</h3>
      </div>

      <div id="DadosAtendimento">
        <img
          src={chatinfo}
          id="chatbubble"
          alt="Dados do atendimento"
        />
        <h1>Dados do Atendimento</h1>
      </div>
      <div id="dados">
        <h3 className="subTitle" id="nivel">Nível:</h3>
        <h3 id="nivel1">{info.nomeNivelCriticidade}</h3>
        <h3 className="subTitle" id="data">Data:</h3>
        <h3 id="data1">{dateFullToString(new Date(info.dataAbertura))}</h3>
      </div>

      <Button
        id="button"
        onClick={() => {
          IniciarAtendimento(cdAtendimento);
        }}
      >Iniciar Chamada
      </Button>
    </Container>

  );
}
