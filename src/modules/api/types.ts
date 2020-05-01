export interface BaseApiModel {
  id: number;
}

export interface ResponseModel<T extends BaseApiModel> {
  model?: T;
  isError?: boolean;
}

export interface ResponseList<T extends BaseApiModel> {
  results?: T[];
  count?: number;
  isError?: boolean;
}

export interface DeleteResponse {
  id?: number;
  isError?: boolean;
}
