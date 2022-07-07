/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { QRCode } from 'react-qr-svg';
import { Container, Content, Break } from './styles';

import { ReactComponent as GrRed } from '../../assets/gr_red.svg';

export function Etiqueta({ produto, requisicao }) {
  const [produtos, setProtudos] = useState({ produtos: [] });
  const [request, setRequest] = useState({ requisicao: [] });

  useEffect(() => {
    setProtudos({ produtos: [produto] });
  }, [produto]);

  useEffect(() => {
    setRequest({ requisicao: [requisicao] });
  }, [requisicao]);

  const qr = (qrCode) => {
    <QRCode
      bgColor="#FFF"
      fgColor="#000"
      level="Q"
      style={{ width: 256 }}
      value={qrCode}
    />;
  };

  return (
    <>
      {produtos.produtos.map(({ produto }) => (
        <Container>
          <Content>
            <GrRed />
            <p>{produto.Nome_Produto} - { produto.Id_Produto}</p>
            <p>{request[0]} - { request[0]}</p>
            {qr(`${produto.Id_Produto}-${request[0]}`)}
          </Content>
          <Break>&nbsp;</Break>
        </Container>
      ))}

    </>
  );
}
