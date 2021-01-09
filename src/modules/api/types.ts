import IIdentifiable from "modules/types/IIdentifiable";

export interface ResponseModel<T extends IIdentifiable> {
  model?: T;
  isError?: boolean;
}
export type ResponseModelType = ResponseModel<IIdentifiable>;

export interface ResponseList<T extends IIdentifiable> {
  results?: T[];
  count?: number;
  isError?: boolean;
}
export type ResponseListType = ResponseList<IIdentifiable>;

export interface DeleteResponse {
  id?: number;
  isError?: boolean;
}

