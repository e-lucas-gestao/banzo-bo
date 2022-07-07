import React, { useEffect, useState } from 'react';
import { Data } from '../../pages/RequestForm';
import Informacoes from '../infoModal';
import { Container } from './styles';

interface IAModal {
    okModal: boolean | null;
    requestData: Data;
    CloseModal:()=>void;
    BuscarAtendimentoInfo: (cdAtendimento: number | undefined) => void,
    cdAtendimento: number | undefined;

}

export const ConfirmarChamada = ({
  cdAtendimento,
  CloseModal,
  okModal,
  requestData,
  BuscarAtendimentoInfo,

}:IAModal) => (
  <Container id="modal" showModal={okModal !== null}>
    <div id="info">
      <Informacoes
        cdAtendimento={cdAtendimento}
        CloseModal={CloseModal}
        info={requestData}
        BuscarAtendimentoInfo={BuscarAtendimentoInfo}
      />
    </div>
  </Container>
);
