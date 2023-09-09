import axios, { isAxiosError } from 'axios';

import { BLABLACAMPUS_ACCESS_TOKEN_KEY, BLABLACAMPUS_REFRESH_TOKEN_KEY } from '../constants/keys';
import { getAsyncStorage, setAsyncStorage } from '../utils/AsyncStorage';

import { API_URL } from '../constants/environment';

export const api = axios.create({
  baseURL: API_URL,
});

async function getAccessToken() {
  const accessToken = await getAsyncStorage({ key: BLABLACAMPUS_ACCESS_TOKEN_KEY });

  if (accessToken) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}

getAccessToken();

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (accessToken: string) => void;
  onFailure: (error: unknown) => void;
}[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      const refreshToken = await getAsyncStorage({ key: BLABLACAMPUS_REFRESH_TOKEN_KEY });

      if (refreshToken) {
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post('/auth/refresh-token', { refreshToken })
            .then(async ({ data }) => {
              const { accessToken, refreshToken } = data as {
                accessToken: string;
                refreshToken: string;
              };

              await setAsyncStorage({ key: BLABLACAMPUS_ACCESS_TOKEN_KEY, value: accessToken });
              await setAsyncStorage({ key: BLABLACAMPUS_REFRESH_TOKEN_KEY, value: refreshToken });

              api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

              failedRequestsQueue.forEach((request) => {
                request.onSuccess(accessToken);
              });

              failedRequestsQueue = [];
            })
            .catch((error) => {
              failedRequestsQueue.forEach((request) => request.onFailure(error));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess(token: string) {
              if (originalConfig) {
                originalConfig.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalConfig));
              }
            },
            onFailure(error: unknown) {
              reject(error);
            },
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
