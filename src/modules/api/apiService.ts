import ObjectType from "modules/types/ObjectType";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseType = Promise<AxiosResponse<any>>;

const apiService = {
  get: (
    url: string,
    config?: AxiosRequestConfig,
  ): ResponseType => {
    return axios.get(url,  config);
  },

  post: (
    url: string,
    data: ObjectType,
    config?: AxiosRequestConfig
  ): ResponseType => {
    return axios.post(url, data, config);
  },

  patch: (
    url: string,
    data: ObjectType,
    config?: AxiosRequestConfig
  ): ResponseType => {
    return axios.patch(url, data, config);
  },

  delete: (
    url: string,
    config?: AxiosRequestConfig
  ): ResponseType => {
    return axios.delete(url, config);
  }
};

export default apiService;
