import React from 'react';
import { Button } from '../Button';
import { InputDown } from '../InputDown';
import { Content } from './style';
import camGray from '../../assets/camGray.png';
import ballon from '../../assets/ballon.png';
import date from '../../assets/Group.png';
import hours from '../../assets/hora.png';
import { dateToStringFormatted, timeToString } from '../../utils/dateConversion';
import { ModalHistoric } from '../historicModal';

interface IProps{
  dataCriacao: string;
  cdAtendimento : number;
  setCdAtendimentoModal: (cdAtendimento : number) => void;
}

function CallConteudo({ dataCriacao, cdAtendimento, setCdAtendimentoModal } : IProps) {
  return (
    <>
      <Content>
        <div id="table">
          <h3 id="text">Chamada #{cdAtendimento}</h3>
          <div id="icons">
            <img src={camGray} id="door" alt="Sair" />
            <img src={ballon} id="cam" alt="Iniciar chamada em vídeo" />
          </div>
        </div>
        <div id="conteudo">
          <div id="date">
            <img src={date} id="calend" alt="" />
            <p>{dateToStringFormatted(new Date(dataCriacao))}</p>
            <img src={hours} id="hora" alt="" />
            <p>{timeToString(dataCriacao)}</p>
          </div>

        </div>
        <div id="botao">
          <Button onClick={() => setCdAtendimentoModal(cdAtendimento)}>Visualizar</Button>
        </div>
      </Content>
    </>
  );
}

export default CallConteudo;
