/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { callNurseApi, trueApi } from '../../services/api';
import { Title } from '../../components/Title';
import { ContainerIcons, Content } from './styles';
import CallConteudo from '../../components/CallConteudo';
import CallMessage from '../../components/CallMessage';
import Door from '../../assets/Vector.png';
import Cam from '../../assets/Vector.svg';
import info from '../../assets/info.svg';
import InputEnviar from '../../components/textBox';
import Video from '../../components/Video';
import { ModalHistoric } from '../../components/historicModal';
import Info from '../../components/info';
import { ConfirmarChamada } from '../../components/AtendimentoModal';
import { useSocket } from '../../hooks/useSocket';

export interface Data {
  cdAtendimento: number;
  cdAtendente: number;
  nomeNivelCriticidade: string; //
  dataAbertura: string; //
  statusAtendimento: string; //
  cdStatusAtendimento: string;
  cnpjCliente: string; //
  nomeAtendente: string;
  nomeGrupo: string;
  nomeCliente: string;
  cdCliente: number;
  IdInterno: number;
  Chat: IMensagem[];
  Historico: Data[];
  Informacoes: Data[];
}

export interface IMensagem {
  nomeRemetente: string;
  conteudo: string;
  dataEnvio: Date;
  cdAtendimento: number;
}

export function RequestForm() {
  const { id } = useParams();
  const idAtendimento = +id!;
  const {
    socket,

    receivedMessage,
    enterChatRoom,
    atendimentoFinalizado,
    setAtendimentoFinalizado,
    videoOffer,
    setVideoOffer,
  } = useSocket();

  const [showInfo, setShowInfo] = useState(false);
  const [receivedCall, setReceivedCall] = useState<string | null>(null);
  const [cdAtendimentoModal, setCdAtendimentoModal] = useState<number | null>(null);
  const [okModal, setOkModal] = useState<boolean | null>(true);
  const [requestData, setRequestData] = useState<Data>({} as Data);
  const [mensagemLocal, setMensagemLocal] = useState('');

  const [remoteVideoHidden, setRemoteVideoHidden] = useState(false);
  const [remoteMuted, setRemoteMuted] = useState(false);

  const [showVideo, setShowVideo] = useState(false);
  const idUsuario = sessionStorage.getItem('id');

  function CloseModal() {
    setOkModal(null);
  }

  function OpenInfo() {
    setShowInfo(value => !value);
  }

  function OpenVideo() {
    setShowVideo(true);
  }

  function handleVideoBox() {
    setShowVideo(!showVideo);
  }

  function CloseVideo() {
    setShowVideo(false);
  }

  async function BuscarAtendimentoInfo(cdAtendimento: number | undefined) {
    try {
      const response = await trueApi.get(
        `/atendimento/?cdAtendimento=${cdAtendimento}`,
      );
      if (response?.data?.status) {
        setRequestData((old) => ({ ...old, ...response.data.atendimento }));
      }
    } catch {
      toast.error('Erro ao buscar dados');
    }
  }

  async function FinalizarChamada(cdAtendimento: string | undefined) {
    try {
      if (requestData?.cdStatusAtendimento === 'F') {
        toast.error('Erro ao finalizar atendimento: Atendimento já finalizado!');
      } else {
        const response = await callNurseApi.put('/atendimento/end', {
          cdAtendimento,
          cdUsuario: idUsuario,
          cdCliente: null,
        });

        if (response?.data.status) {
          toast.success('Atendimento finalizado com sucesso!');
          BuscarAtendimentoInfo(idAtendimento);
        } else {
          toast.error('Erro ao finalizar atendimento!');
        }
      }
    } catch {
      toast.error('Erro ao buscar dados');
    }
  }

  async function BuscarMensagensChat(cdAtendimento: number | undefined) {
    try {
      const response = await callNurseApi.post('/mensagem/select', {
        cdAtendimento,
        pageCount: 500,
        pageNumber: 1,
      });
      if (response.data.status) {
        setRequestData((oldRequestData: Data) =>
          ({ ...oldRequestData, Chat: response.data.messages }));
      }
    } catch {
      toast.error('Erro ao buscar dados');
    }
  }

  async function BuscarHistorico(cdCliente: number) {
    try {
      const response = await callNurseApi.post('/atendimento/pageSelect', {
        empresaCliente: cdCliente,
        pageCount: 500,
        pageNumber: 1,
      });
      setRequestData((oldRequestData) => {
        const newHistory = [
          ...(oldRequestData.Historico || []),
          ...(response?.data?.atendimentos || []),
        ];
        return { ...oldRequestData, Historico: newHistory };
      });
    } catch {
      toast.error('Erro ao buscar dados');
    }
  }

  async function envioMensagem(
    cdAtendimento: number | undefined,
    dataEnvio: Date,
    conteudo: string,
  ) {
    try {
      const response = await trueApi.post('/mensagem/send', {
        usuarioRemetente: idUsuario,
        dataEnvio,
        cdAtendimento,
        conteudo,
      });

      if (response?.data.status) {
        console.log('mensagem enviada com sucesso');
      }
    } catch {
      toast.error('Mensagem não enviada');
    }
  }
  function handleSubmit() {
    envioMensagem(requestData.cdAtendimento, new Date(), mensagemLocal);
    setMensagemLocal('');
  }

  useEffect(() => {
    const carregarInformacoes = async () => {
      await BuscarAtendimentoInfo(idAtendimento);
    };

    carregarInformacoes();

    BuscarMensagensChat(idAtendimento);
  }, []);

  useEffect(() => {
    if (requestData.cdCliente) {
      BuscarHistorico(requestData.cdCliente);
    }
  }, [requestData.cdCliente]);

  useEffect(() => {
    if (requestData?.cdStatusAtendimento === 'A' && requestData?.cdAtendente === +idUsuario!) {
      enterChatRoom({ cdAtendimento: requestData.cdAtendimento, cdUsuario: +idUsuario! });
    }
  }, [requestData]);

  useEffect(() => {
    if (receivedMessage) {
      setRequestData((oldRequestData) => {
        const newChat = [...(oldRequestData.Chat || []), receivedMessage];
        return { ...oldRequestData, Chat: newChat };
      });
    }
  }, [receivedMessage]);

  useEffect(() => {
    if (atendimentoFinalizado) {
      toast.info('Atendimento finalizado pelo cliente');
      BuscarAtendimentoInfo(idAtendimento);
      setAtendimentoFinalizado(false);
    }
  }, [atendimentoFinalizado]);

  useEffect(() => {
    if (videoOffer) {
      if (videoOffer.cdUsuario !== +idUsuario!) {
        setReceivedCall(videoOffer.offer);
        setVideoOffer(null);
      }
    }
  }, [videoOffer]);

  // useEffect(() => {

  //   if (msg.muted !== undefined && msg.cdUsuario !== -1) {
  //     setRemoteMuted(msg.muted);
  //   }
  //   if (msg.hidden !== undefined && msg.cdUsuario !== -1) {
  //     setRemoteVideoHidden(msg.hidden);
  //   }
  // }, [videoOffer]);

  return (
    <>
      {requestData?.cdStatusAtendimento === 'P' && (
      <ConfirmarChamada
        BuscarAtendimentoInfo={BuscarAtendimentoInfo}
        cdAtendimento={idAtendimento}
        okModal={okModal}
        CloseModal={CloseModal}
        requestData={requestData}
      />
      )}
      <Title title="Atendimento" backButton />
      <Content>
        <div id="chatBox">
          <div id="chatContent">

            <div id="tableChat">
              <div id="chatHeader">
                <div id="info">
                  <button
                    type="button"
                    onClick={() => {
                      OpenInfo();
                    }}
                  >
                    <img
                      src={info}
                      id="info"
                      alt="Info"
                    />
                  </button>

                </div>
                <div id="title">
                  <h3 id="nameChat">{requestData?.nomeCliente}</h3>
                </div>
                <ContainerIcons hide={!(requestData?.cdStatusAtendimento === 'A' && requestData?.cdAtendente === +idUsuario!)}>
                  <button type="button">
                    <img
                      src={Door}
                      onClick={() => {
                        FinalizarChamada(id);
                      }}
                      id="door"
                      alt="Sair"
                    />
                  </button>

                  {!showVideo && (
                    <button id={receivedCall ? 'receivingCall' : 'receivingCall'} type="button" onClick={handleVideoBox}>
                      <img src={Cam} id="cam" alt="Iniciar Chamada de Vídeo" />
                      {
                      receivedCall &&
                      <div id="callDot" />
                    }
                    </button>
                  )}
                </ContainerIcons>

              </div>
              {showInfo &&
                <Info requestData={requestData} OpenInfo={OpenInfo} />}
              {showVideo && (
              <Video
                CloseVideo={CloseVideo}
                requestData={requestData}
                socket={socket}
                receivedCall={receivedCall}
                remoteVideoHidden={remoteVideoHidden}
                remoteMuted={remoteMuted}
              />
              )}
              <ModalHistoric
                cdAtendimentoModal={cdAtendimentoModal}
                setCdAtendimentoModal={setCdAtendimentoModal}
              />
              <CallMessage chat={requestData?.Chat || []} />
            </div>
            <div id="tableHistorico">
              <div id="historicoHeader">
                <h3 id="nameHistorico">Histórico</h3>
              </div>
              {requestData.Historico &&
                requestData.Historico.map((atendimento) => (
                  <CallConteudo
                    cdAtendimento={atendimento.cdAtendimento}
                    dataCriacao={atendimento.dataAbertura}
                    setCdAtendimentoModal={setCdAtendimentoModal}
                  />
                ))}
            </div>
          </div>
          {(requestData?.cdStatusAtendimento === 'A') && (
            <InputEnviar
              nome={mensagemLocal}
              setMensagemLocal={setMensagemLocal}
              envioMensagem={handleSubmit}
              canSend={requestData?.cdAtendente === +idUsuario!}
            />
          )}

          <div />
        </div>
      </Content>
    </>
  );
}
