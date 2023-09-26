import { Platform } from 'react-native';

// aqui é o do juats
// const apiUrl = process.env.EXPO_PUBLIC_API_URl || 'http://192.168.0.120:3000';

// aqui é o do bilu
const apiUrl = process.env.EXPO_PUBLIC_API_URl || 'http://192.168.8.110:3000';

//exemplo
// const apiUrl = process.env.EXPO_PUBLIC_API_URl || 'http://localhost:3000';

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
