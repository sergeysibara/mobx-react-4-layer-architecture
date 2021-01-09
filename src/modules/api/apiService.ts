import {
  ResponseListType,
  ResponseModelType,
  DeleteResponse
} from "./types";
import ObjectType from "modules/types/ObjectType";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseType = Promise<AxiosResponse<any>>;

const apiService = {
  get: (
    url: string,
    config?: ObjectType,
  ): ResponseType => {
    console.log(config)
    return axios.get(url, config as AxiosRequestConfig);
  },

  post: (
    url: string,
    data: ObjectType,
    config?: ObjectType
  ): ResponseType => {
    return axios.post(url, data, config as AxiosRequestConfig);
  },

  patch: (
    url: string,
    data: ObjectType,
    config?: ObjectType
  ): ResponseType => {
    return axios.patch(url, data, config as AxiosRequestConfig);
  },

  delete: (
    url: string,
    config?: ObjectType
  ): ResponseType => {
    return axios.delete(url, config as AxiosRequestConfig);
  }
};

export default apiService;
