import ObjectType from "modules/types/ObjectType";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiServiceResponseType = Promise<AxiosResponse<any>>;

// const handleError = (e) => {
//   let message = 'Request error';
//
//   if (e.response) {
//     switch (e.response.status) {
//       case 400:
//         // eslint-disable-next-line no-case-declarations,camelcase
//         const { status_code, ...errors } = e.response.data;
//         message = Object.values(errors).join(' ');
//         break;
//       case 403:
//       case 404:
//         message = e.response.details || e.message;
//         break;
//       default:
//         message = e.message;
//         break;
//     }
//   }
//
//   return { ...e, message };
// };

const apiService = {
  get: (
    url: string,
    config?: AxiosRequestConfig,
  ): ApiServiceResponseType => {
    return axios.get(url,  config);
  },

  post: (
    url: string,
    data: ObjectType,
    config?: AxiosRequestConfig
  ): ApiServiceResponseType => {
    return axios.post(url, data, config);
  },

  patch: (
    url: string,
    data: ObjectType,
    config?: AxiosRequestConfig
  ): ApiServiceResponseType => {
    return axios.patch(url, data, config);
  },

  delete: (
    url: string,
    config?: AxiosRequestConfig
  ): ApiServiceResponseType => {
    return axios.delete(url, config);
  }
};

export default apiService;
