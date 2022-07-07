import React from 'react';
import { Content } from './styles';
import person from '../../assets/person.svg';
import maleta from '../../assets/maleta.svg';
import close from '../../assets/closeIcon.svg';
import bobble from '../../assets/chatbobble.svg';
import { Data } from '../../pages/RequestForm';

interface IData{
  OpenInfo:()=>void,
  requestData:Data
}

export default function Info({
  requestData,
  OpenInfo,
}: IData) {
  return (
    <Content>
      <div id="table">
        <div id="header">
          <p id="info">Informações</p>
          <button type="button" onClick={() => OpenInfo()} id="button-info">
            <img id="close-info" src={close} className="header-icon" alt="Icone de fechar" />
          </button>
        </div>

        <div className="description">
          <div className="description-header">
            <img src={person} className="description-header-icon" alt="Icone de busto de pessoa" />
            <p className="description-header-text">Solicitante</p>
          </div>
          <div className="info-content">
            <div className="info-content-inline">
              <p className="info-text-description">CNPJ</p>
              <p className="info-text-content">{requestData.cnpjCliente}</p>
            </div>
            <div className="info-content-inline">
              <p className="info-text-description">Razão Social</p>
              <p className="info-text-content">{requestData.nomeCliente}</p>
            </div>
            <div className="info-content-inline">
              <p className="info-text-description">Solicitante</p>
              <p className="info-text-content">{requestData.nomeCliente}</p>
            </div>

          </div>
          <div className="description-header">
            <img src={maleta} className="description-header-icon" alt="Icone de maleta" />
            <p className="description-header-text">Empresa prestadora</p>
          </div>
          <div className="info-content-inline">
            <p className="info-text-description">CNPJ</p>
            <p className="info-text-content">00.000.000/0000-00</p>
          </div>
          <div className="info-content-inline">
            <p className="info-text-description">Razão Social</p>
            <p className="info-text-content">{requestData.nomeGrupo}</p>
          </div>

        </div>
      </div>

    </Content>
  );
}
