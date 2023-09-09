import axios, { isAxiosError } from 'axios';
const { API_URL } = process.env;

import { BLABLACAMPUS_ACCESS_TOKEN_KEY, BLABLACAMPUS_REFRESH_TOKEN_KEY } from '../constants/keys';

export const api = axios.create({
  baseURL: API_URL,
});

const accessToken = localStorage.getItem(BLABLACAMPUS_ACCESS_TOKEN_KEY);

if (accessToken) {
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (accessToken: string) => void;
  onFailure: (error: unknown) => void;
}[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      const refreshToken = localStorage.getItem(BLABLACAMPUS_REFRESH_TOKEN_KEY);

      if (refreshToken) {
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post('/auth/refresh-token', { refreshToken })
            .then(({ data }) => {
              const { accessToken, refreshToken } = data as {
                accessToken: string;
                refreshToken: string;
              };

              localStorage.setItem(BLABLACAMPUS_ACCESS_TOKEN_KEY, accessToken);
              localStorage.setItem(BLABLACAMPUS_REFRESH_TOKEN_KEY, refreshToken);

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
