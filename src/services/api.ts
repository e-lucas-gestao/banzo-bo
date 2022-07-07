/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
import axios from 'axios';
import { variables, keySessionStorage } from '../configuration/Constants';
import { useAuth } from '../hooks/useAuth';

const http = require('http');
const https = require('https');

let authToken = sessionStorage.getItem(keySessionStorage.KEY_TOKEN);

export const trueApi = axios.create({
  // headers: {
  //   Authorization: `Bearer ${variables.API_AUTHORIZATION}`,
  // },
  timeout: 30000,

  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  maxRedirects: 10,

  maxContentLength: 50 * 1000 * 1000,

  baseURL: variables.API_URL,
});

export const callNurseApi = axios.create({

  timeout: 30000,

  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  maxRedirects: 10,

  maxContentLength: 50 * 1000 * 1000,

  // baseURL: 'http://192.168.1.84:3001',
  baseURL: 'https://call-nurse-api-rsaxdr7avq-rj.a.run.app',
});

trueApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // extracting response and config objects
    const { response, config } = error;
    // checking if error is Aunothorized error
    if (response.status === 401) {
      let token = sessionStorage.getItem(keySessionStorage.KEY_TOKEN);
      if (token) {
        // if refresh token exists in local storage proceed
        try {
          // try refreshing token
          const { data } = await trueApi.post('/auth/token', { user: 'gr', senha: 'gr@2022' });
          let accessToken = data.AccessToken;
          if (accessToken) {
            sessionStorage.setItem(keySessionStorage.KEY_TOKEN, `${accessToken}`);
            // with new token retry original request
            // config.headers['Authorization'] = `Bearer ${accessToken}`;
            return trueApi(config);
          }
        } catch (e) {
          console.warn(e);
        }
      }
    }
    // clear local storage and log user out
    sessionStorage.clear();
    return error;
  },
);
