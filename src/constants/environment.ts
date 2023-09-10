import { Platform } from 'react-native';

// .env está chegando undefined aqui
const apiUrl = process.env.API_URL || 'http://localhost:3000';

/**
 * Checa qual o emulador e retorna a url local
 * @param {string} apiUrl
 * @return {*}  {string}
 */
function transformAPIUrl(apiUrl: string): string {
  if (Platform.OS === 'android') return apiUrl.replace('localhost', '10.0.2.2');

  return apiUrl;
}

const API_URL: string = transformAPIUrl(apiUrl as string);
export { API_URL };