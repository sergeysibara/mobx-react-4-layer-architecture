import todosServerEmulator from "server/todosServerEmulator";
import {
  BaseApiModel,
  ResponseList,
  ResponseModel,
  DeleteResponse
} from "./types";

export type Response =
  | ResponseList<BaseApiModel>
  | ResponseModel<BaseApiModel>
  | DeleteResponse;

const callApiMethod = async (
  method: string,
  url: string,
  data?: object,
  params?: object
): Promise<Response> => {
  return new Promise(resolve => {
    // hardcoded todosServerEmulator (only for example with one page)
    const responseData = todosServerEmulator[method](url, data, params);
    resolve(responseData);
  });
};

const apiService = {
  get: (
    url: string,
    params?: object
  ): Promise<ResponseList<BaseApiModel> | ResponseModel<BaseApiModel>> =>
    callApiMethod("get", url, undefined, params) as Promise<
      ResponseList<BaseApiModel> | ResponseModel<BaseApiModel>
    >,

  post: (url, data: object): Promise<ResponseModel<BaseApiModel>> =>
    callApiMethod("post", url, data) as Promise<ResponseModel<BaseApiModel>>,

  patch: (
    url: string,
    data: object,
    params?: object
  ): Promise<ResponseModel<BaseApiModel>> =>
    callApiMethod("patch", url, data, params) as Promise<
      ResponseModel<BaseApiModel>
    >,

  delete: (url: string, params?: object): Promise<DeleteResponse> =>
    callApiMethod("delete", url, params) as Promise<DeleteResponse>
};

export default apiService;
