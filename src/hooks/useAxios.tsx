import axios from 'axios';
import { trueApi } from '../services/api';
import { useAuth } from './useAuth';
import { variables, keySessionStorage } from '../configuration/Constants';

const useAxios = () => {
  const { accessToken, setAccessToken, logout } = useAuth();

  const axiosInstance = axios.create({
    baseURL: variables.API_URL,
    headers: `Bearer ${accessToken}`,
  });

  trueApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response, config } = error;

      if (response.status === 401) {
        let token = accessToken;
        if (token) {
          try {
            const { data } = await trueApi.post('/auth/token', { user: 'gr', senha: 'gr@2022' });
            let newAccessToken = data.AccessToken;
            if (accessToken) {
              sessionStorage.setItem(keySessionStorage.KEY_TOKEN, `${newAccessToken}`);
              setAccessToken(newAccessToken);
              // with new token retry original request
              config.headers.Authorization = `Bearer ${newAccessToken}`;
              return trueApi(config);
            }
          } catch (e) {
            console.warn(e);
          }
        }
        // logout();
      }
      // clear local storage and log user out
      return error;
    },
  );

  return trueApi;
};

export default useAxios;
