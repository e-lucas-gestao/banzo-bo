/* eslint-disable global-require */
const inProduction = true;

export const keySessionStorage = {
  KEY_TOKEN: '@BNZL:token',
  KEY_PERMISSIONS: '@BNZL:permissions',
  KEY_ID: 'id',
};

const production = {
  API_URL: 'https://call-nurse-api-rsaxdr7avq-rj.a.run.app',
  API_AUTHORIZATION: `${sessionStorage.getItem(keySessionStorage.KEY_PERMISSIONS)}`,
  IMAGES_URL: 'https://homologacao.egestao.net/Supply',
  TOKEN_USER: 'gr',
  TOKEN_PASSWORD: '@gr2022',
};

const development = {
  API_URL: 'http://192.168.1.84:3001',
  API_AUTHORIZATION: `${sessionStorage.getItem(keySessionStorage.KEY_PERMISSIONS)}`,
  IMAGES_URL: 'https://homologacao.egestao.net/Supply',
  TOKEN_USER: 'gr',
  TOKEN_PASSWORD: '@gr@2022',
};

const keyEncrypt = 'Every straight line is an arc of an infinite circle';

export const variables = inProduction ? production : development;

export const encryptor = require('simple-encryptor')(keyEncrypt);
