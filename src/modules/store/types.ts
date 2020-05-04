import Identifiable from "../types/Identifiable";

export type ErrorType = string | object;

export interface ListModule<TListItem extends Identifiable> {
  results: TListItem[];
  count?: number; // number of all items on server
  isLoading?: boolean;
  error?: ErrorType;
}

export type FiltersType = Record<string, string | number | boolean>;
export interface SearchParams {
  filters: FiltersType;
  sorting?: string;
  paging: {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
  };
}

export interface EditModule<TEditModel extends Identifiable> {
  model?: TEditModel;
  isLoading?: boolean;
  error?: ErrorType;
}
