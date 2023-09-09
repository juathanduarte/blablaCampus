const { API_URL } = process.env;
import axios from 'axios';

const BASE_URL = API_URL;

export const apiAuth = axios.create({
  baseURL: BASE_URL,
});

class Api {
  // POST: /auth/signin
  // BODY: { email: string, password: string }
  post<a>(url: string, params: Object): Promise<a> {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = this.headers({});
        const response = await apiAuth.post(url, params, { headers });
        const resJson = response.data;
        if (resJson.status === 'success') {
          resolve(resJson.data);
        } else {
          reject(resJson.message);
        }
      } catch (error: any) {
        const errorJson = new Error('Erro ao enviar informações');
        reject(errorJson);
      }
    });
  }

  headers(h: Object): any {
    const jwt = localStorage.getItem('@blablacampus/access-token');
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
      ...h,
    };
    return headers;
  }

  setTokenAcess(tokenAcess: string) {
    localStorage.setItem('@blablacampus/access-token', tokenAcess);
  }

  setTokenRefresh(tokenRefresh: string) {
    localStorage.setItem('@blablacampus/refresh-token', tokenRefresh);
  }
}

const AuthApi = new Api();
export default AuthApi;
