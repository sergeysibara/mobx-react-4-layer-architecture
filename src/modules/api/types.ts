import Identifiable from "modules/types/Identifiable";

export interface ResponseModel<T extends Identifiable> {
  model?: T;
  isError?: boolean;
}

export interface ResponseList<T extends Identifiable> {
  results?: T[];
  count?: number;
  isError?: boolean;
}

export interface DeleteResponse {
  id?: number;
  isError?: boolean;
}
