import Identifiable from "../types/Identifiable";
import ObjectType from "../types/ObjectType";

export type ErrorType = string | ObjectType;

export interface ListModule<TListItem extends Identifiable> {
  results: TListItem[];
  count?: number; // number of all items on server
  isLoading?: boolean;
  error?: ErrorType;
}

export type FiltersType = Record<string, unknown>;
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
