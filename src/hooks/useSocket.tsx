/* eslint-disable no-undef */
import { useState, createContext, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { trueApi } from '../services/api';
import { variables, keySessionStorage, encryptor } from '../configuration/Constants';
import { Data, IMensagem } from '../pages/RequestForm';
import bunzlIcon from '../assets/bunzl-saude.svg';

interface IEnterChat{
    cdAtendimento: number;
    cdUsuario: number
}

interface ISocketVideoMessage {
  offer: string;
  cdUsuario?: number;
  cdCliente?: number;
}

interface SocketContextData {
    socket: Socket | undefined,
    receivedMessage: IMensagem | null;
    enterChatRoom: (props: IEnterChat) => void,
    novosAtendimentos: number,
    setNovosAtendimentos: Dispatch<SetStateAction<number>>,
    atendimentoFinalizado : boolean
    setAtendimentoFinalizado : Dispatch<SetStateAction<boolean>>,
    videoOffer: ISocketVideoMessage | null
    setVideoOffer: Dispatch<SetStateAction<ISocketVideoMessage | null>>
}

const SocketContext = createContext<SocketContextData>({} as any);

function SocketProvider({ children } : any) {
  const [socket, setSocket] = useState<Socket>();
  const [receivedMessage, setReceivedMessage] = useState<IMensagem |null>(null);
  const [novosAtendimentos, setNovosAtendimentos] = useState<number>(0);
  const [atendimentoFinalizado, setAtendimentoFinalizado] = useState<boolean>(false);
  const [videoOffer, setVideoOffer] = useState<ISocketVideoMessage | null>(null);
  const [videoAction, setVideoAction] = useState<ISocketVideoMessage | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket) {
      setSocket(io('https://call-nurse-api-rsaxdr7avq-rj.a.run.app', {}));
      // setSocket(io('http://192.168.1.84:3001', {}));
      // const cartao = io('http://192.168.1.84:3001');
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => {
        console.log({ msg });

        setReceivedMessage(msg);
      });

      socket.on('queue change', (atendimentos) => {

      });

      socket.on('novo atendimento', (cdAtendimento) => {
        setNovosAtendimentos(oldNumber => oldNumber + 1);

        const notification = new Notification('BUNZL', {
          body: 'Novo atendimento em espera!',
          icon: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/image-1024.png',
        });

        notification.onclick = () => {
          navigate(`requests-form/${cdAtendimento}`);
          window.focus();
        };
      });

      socket.on('end service', ({ cdCliente, cdUsusario }) => {
        if (cdCliente) {
          setAtendimentoFinalizado(true);
        }
      });

      socket.on('video call request', (socketMessage: ISocketVideoMessage) => {
        setVideoOffer(socketMessage);
      });

      socket.on('video action notification', (msg) => {
        setVideoAction(msg);
      });
    }
  }, [socket]);

  const enterChatRoom = ({ cdAtendimento, cdUsuario }: IEnterChat) => {
    if (socket) { socket.emit('enter room', { cdAtendimento, cdUsuario }); }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        receivedMessage,
        enterChatRoom,
        novosAtendimentos,
        setNovosAtendimentos,
        atendimentoFinalizado,
        setAtendimentoFinalizado,
        videoOffer,
        setVideoOffer,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

function useSocket() {
  const context = useContext(SocketContext);

  return context;
}

export {
  useSocket,
  SocketProvider,
};
