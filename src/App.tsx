import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Routing } from './routes';
import { AuthProvider } from './hooks/useAuth';
import ListaNotificacaoProvider from './hooks/useNotification';
import { SocketProvider } from './hooks/useSocket';

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <AuthProvider>
          <ListaNotificacaoProvider>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routing />
            <GlobalStyle />
          </ListaNotificacaoProvider>
        </AuthProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
