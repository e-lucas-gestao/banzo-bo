/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import { Content, MessageContainer } from './style';
import User from '../../assets/user.png';
import { IMensagem } from '../../pages/RequestForm';
import { dateFullToString } from '../../utils/dateConversion';

function transformMessage(mensagem: IMensagem) {
  return (
    <MessageContainer owner>

      <div id="title">
        <img src={User} id="user" alt="" />
        <div id="box">
          <h3>{mensagem.nomeRemetente}</h3>
          <div id="message">
            <p>{mensagem.conteudo}</p>
          </div>
        </div>
        <div id="date">
          <p>{dateFullToString(new Date(mensagem.dataEnvio))}</p>
        </div>
      </div>

    </MessageContainer>
  );
}

function CallMessage({ chat } : {chat?:IMensagem[]}) {
  return (
    <Content>

      {chat && chat.map(transformMessage)}

    </Content>
  );
}

export default CallMessage;
