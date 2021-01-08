import todosServerEmulator from "server/todosServerEmulator";
import {
  ResponseList,
  ResponseModel,
  DeleteResponse
} from "./types";
import IIdentifiable from "modules/types/IIdentifiable";
import ObjectType from "modules/types/ObjectType";

export type Response =
  | ResponseList<IIdentifiable>
  | ResponseModel<IIdentifiable>
  | DeleteResponse;

const callApiMethod = async (
  method: string,
  url: string,
  data?: ObjectType,
  params?: ObjectType
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
    params?: ObjectType
  ): Promise<ResponseList<IIdentifiable> | ResponseModel<IIdentifiable>> =>
    callApiMethod("get", url, undefined, params) as Promise<
      ResponseList<IIdentifiable> | ResponseModel<IIdentifiable>
    >,

  post: (url, data: ObjectType): Promise<ResponseModel<IIdentifiable>> =>
    callApiMethod("post", url, data) as Promise<ResponseModel<IIdentifiable>>,

  patch: (
    url: string,
    data: ObjectType,
    params?: ObjectType
  ): Promise<ResponseModel<IIdentifiable>> =>
    callApiMethod("patch", url, data, params) as Promise<
      ResponseModel<IIdentifiable>
    >,

  delete: (url: string, params?: ObjectType): Promise<DeleteResponse> =>
    callApiMethod("delete", url, params) as Promise<DeleteResponse>
};

export default apiService;
