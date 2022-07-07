import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IMensagem } from '../../pages/RequestForm';
import { callNurseApi } from '../../services/api';
import { Button } from '../Button';
import CallMessage from '../CallMessage';
import { Container } from './styles';

interface Modal {
    setCdAtendimentoModal: (cdAtendimentoModal: number | null) => void,
    cdAtendimentoModal: number | null;
}

export const ModalHistoric = ({
  cdAtendimentoModal,
  setCdAtendimentoModal,

}:Modal) => {
  const [chatModal, setChatModal] = useState<IMensagem[]>([]);

  async function chatView() {
    try {
      const response = await callNurseApi.post('/mensagem/select', {
        cdAtendimento: cdAtendimentoModal,
        pageCount: 500,
        pageNumber: 1,
      });
      if (response.data.status) {
        setChatModal(response.data.messages);
      }
    } catch {
      toast.error('Erro ao buscar dados');
    }
  }

  useEffect(() => {
    if (cdAtendimentoModal != null) {
      chatView();
    }
  }, [cdAtendimentoModal]);
  return (
    <Container id="modal" showModal={cdAtendimentoModal !== null}>
      <div id="ModalHistoric">
        {
          (
            chatModal?.length > 0 ?
              <CallMessage chat={chatModal} /> :
              <p id="p">Atendimento não possui mensagens</p>
            )
        }
        <div>
          <Button id="button" onClick={() => setCdAtendimentoModal(null)}>Ok
          </Button>
        </div>
      </div>
    </Container>
  );
};
