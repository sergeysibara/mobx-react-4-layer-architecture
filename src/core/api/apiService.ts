import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ObjectType } from '../types';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiServiceResponseType = Promise<AxiosResponse<any>>;

const apiService = {
  get: (url: string, config?: AxiosRequestConfig): ApiServiceResponseType => {
    return axios.get(url, config);
  },

  post: (url: string, data: ObjectType, config?: AxiosRequestConfig): ApiServiceResponseType => {
    return axios.post(url, data, config);
  },

  patch: (url: string, data: ObjectType, config?: AxiosRequestConfig): ApiServiceResponseType => {
    return axios.patch(url, data, config);
  },

  delete: (url: string, config?: AxiosRequestConfig): ApiServiceResponseType => {
    return axios.delete(url, config);
  },
};

export default apiService;
