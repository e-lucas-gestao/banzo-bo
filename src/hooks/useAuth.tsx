/* eslint-disable no-undef */
import { useState, createContext, useContext } from 'react';
import { trueApi } from '../services/api';
import { variables, keySessionStorage, encryptor } from '../configuration/Constants';

interface AuthContextData {
  accessToken: string | null;
  setAccessToken: any;
  createToken: any;
  logout: () => void;
}

const permission = [
  {
    Tipo: 2,
    CdFuncionalidade: 1,
    Funcionalidade: 'Dashboard',
  },
  {
    Tipo: 2,
    CdFuncionalidade: 2,
    Funcionalidade: 'Atendimentos',
  },
  {
    Tipo: 2,
    CdFuncionalidade: 3,
    Funcionalidade: 'Empresa',
  },
  {
    Tipo: 2,
    CdFuncionalidade: 4,
    Funcionalidade: 'Gerenciamento de FAQ',
  },
  {
    Tipo: 2,
    CdFuncionalidade: 5,
    Funcionalidade: 'Usuários',
  },
];

export type dataUserResponse = {
  status:boolean,
  message:string,
  cdUsuario:number
}

const AuthContext = createContext<AuthContextData>({} as any);

export function AuthProvider({ children } : any) {
  const [accessToken, setAccessToken] = useState(() =>
    (sessionStorage.getItem(keySessionStorage.KEY_TOKEN)));

  async function createToken(email: string, password: string) {
    try {
      // const tokenData = await trueApi.post('/auth/token', { user: 'gr', senha: 'gr@2022' });
      // sessionStorage.setItem('@GR:token', tokenData.data.AccessToken);
      sessionStorage.setItem(keySessionStorage.KEY_TOKEN, 'placeholder');
      let validation = {} as any;

      const response = await trueApi.post('/usuario/login', { email, senha: password }, {
        headers: {
          // Authorization: `Bearer ${tokenData.data.AccessToken}`,
        } });
      validation = response.data;
      console.log(validation);
      if (validation.status) {
        sessionStorage.setItem('id', validation.cdUsuario);
        sessionStorage.setItem(keySessionStorage.KEY_PERMISSIONS,
          encryptor.encrypt(JSON.stringify(permission)));
        const token = sessionStorage.getItem(keySessionStorage.KEY_TOKEN);
        setAccessToken(token);
        return true;
      }
      throw new Error();
    } catch (error) {
      console.log('Erro em criar token', error);
      return false;
    }
  }

  function logout() {
    sessionStorage.removeItem(keySessionStorage.KEY_TOKEN);
    sessionStorage.removeItem(keySessionStorage.KEY_PERMISSIONS);
    sessionStorage.removeItem(keySessionStorage.KEY_ID);
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{ createToken, accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
