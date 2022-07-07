/* eslint-disable no-console */
import React, { useState } from 'react';
import Expandable from '../ExpandableContainer';
import { Input } from '../Input';

interface IMensagem {
nome: string;
conteudo: string;
sendBy: number;
meu: boolean;
}

export default function Chat({ listChat, addChatMessage }: {listChat: any[], addChatMessage: any}) {
  const [conteudo, setConteudo] = useState('');
  return (
    <><h3>Chat</h3>
      <div className="message-chat" id="message-box-itemm">
        {listChat?.map((item, index) => (
          <>
            {item.meu ? <></> : <h3 className="name"> {item.nome}</h3>}
            <h3 className={item.meu ? 'chat2' : 'chat'}> {item.conteudo}</h3>
          </>
        ))}
        <Input
          value={conteudo}
          name="texto"
          placeholder="Mensagem:"
          onChange={(e) => {
            setConteudo(e.target.value);
          }}
          onKeyDown={(e) => {
            console.log(e.nativeEvent.code);
            if (e.nativeEvent.code === 'Enter' && conteudo != null) {
              const message: IMensagem = {
                conteudo,
                nome: 'Julio',
                sendBy: 5,
                meu: true,
              };
              addChatMessage(message);
              setConteudo('');
            }
          }}
        />
      </div>
    </>
  );
}
