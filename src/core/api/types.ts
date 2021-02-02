import { ObjectType, IIdentifiable } from '../types';

export interface IResponseModel<T extends IIdentifiable> {
  model: T;
}

export interface IResponseList<T extends IIdentifiable> {
  results: T[];
  count?: number;
}

export interface IDeleteResponse {
  id?: number;
}

export interface IResponseError {
  isError: boolean;
  message: string;
  error?: ObjectType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIResponseError(object: any): object is IResponseError {
  return 'isError' in object;
}
