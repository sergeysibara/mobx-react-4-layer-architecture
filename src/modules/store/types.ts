import IIdentifiable from "../types/IIdentifiable";
import ObjectType from "../types/ObjectType";

export type ErrorType = string | ObjectType;

export interface IListState<TListItem extends IIdentifiable> {
  results: TListItem[];
  count?: number; // number of all items on server
  isLoading?: boolean;
  error?: ErrorType;
}

export interface ISearchParamsState {
  filters: ObjectType;
  sorting?: string;
  paging: {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
  };
}

export interface IEditState<TEditModel extends IIdentifiable> {
  model?: TEditModel;
  isLoading?: boolean;
  error?: ErrorType;
}
