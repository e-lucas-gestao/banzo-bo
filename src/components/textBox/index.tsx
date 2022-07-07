import React from 'react';
import { Button } from '../Button';
import { Content } from './styles';

interface IValoresProps {
  nome: string;
  setMensagemLocal: (value: string) => void;
  envioMensagem: () => void;
  canSend: boolean
}

function InputEnviar({ nome, setMensagemLocal, envioMensagem, canSend }: IValoresProps) {
  return (
    <Content>
      {
        canSend ? (
          <div id="box">
            <div id="textBox">
              <input
                type="text"
                value={nome}
                onChange={(e) => setMensagemLocal(e.target.value)}
                id="escreve"
                placeholder="Escreva sua mensagem aqui..."
                onKeyDown={(e) => {
                  if (e.nativeEvent.code === 'Enter') {
                    envioMensagem();
                  }
                }}
              />
            </div>
            <div id="button">
              <Button id="Button" type="button" onClick={() => envioMensagem()}>
                Enviar
              </Button>
            </div>
          </div>
        ) : <h3>Apenas participantes do atendimento podem enviar mensagens!</h3>
      }

    </Content>
  );
}

export default InputEnviar;
