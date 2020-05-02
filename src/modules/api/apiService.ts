import todosServerEmulator from "server/todosServerEmulator";
import {
  ResponseList,
  ResponseModel,
  DeleteResponse
} from "./types";
import Identifiable from "modules/types/Identifiable";

export type Response =
  | ResponseList<Identifiable>
  | ResponseModel<Identifiable>
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
  ): Promise<ResponseList<Identifiable> | ResponseModel<Identifiable>> =>
    callApiMethod("get", url, undefined, params) as Promise<
      ResponseList<Identifiable> | ResponseModel<Identifiable>
    >,

  post: (url, data: object): Promise<ResponseModel<Identifiable>> =>
    callApiMethod("post", url, data) as Promise<ResponseModel<Identifiable>>,

  patch: (
    url: string,
    data: object,
    params?: object
  ): Promise<ResponseModel<Identifiable>> =>
    callApiMethod("patch", url, data, params) as Promise<
      ResponseModel<Identifiable>
    >,

  delete: (url: string, params?: object): Promise<DeleteResponse> =>
    callApiMethod("delete", url, params) as Promise<DeleteResponse>
};

export default apiService;
