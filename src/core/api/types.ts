import IIdentifiable from "core/types/IIdentifiable";
import ObjectType from "../types/ObjectType";

// todo remove it
export interface ResponseModel<T extends IIdentifiable> {
  model: T;
}
export type ResponseModelType = ResponseModel<IIdentifiable>;

export interface ResponseList<T extends IIdentifiable> {
  results: T[];
  count?: number;
}

export type ResponseListType = ResponseList<IIdentifiable>;

export interface DeleteResponse {
  id?: number;
}

// //type ResponseDataType = IIdentifiable | IIdentifiable[] | number;
// export interface IResponse<T extends unknown> {
//   data: T; // model or model[] or id: number or any another type
// }

export interface IResponseError {
  isError: boolean;
  message: string;
  error?: ObjectType;
}

export function isIResponseError(object: any): object is IResponseError {
  return 'isError' in object;
}

