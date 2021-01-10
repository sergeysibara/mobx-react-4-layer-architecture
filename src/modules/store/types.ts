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
  // https://github.com/typicode/json-server#filter
  filters?: ObjectType;

  // https://github.com/typicode/json-server#sort
  sorting?:  {
    _sort?: string;
    _order?: string;
  };

  // https://github.com/typicode/json-server#paginate
  paging?: {
    _start?: number; // offset
    _page?: number; // pageNumber
    _limit?: number; // pageSize
  };
}

export interface IEditState<TEditModel extends IIdentifiable> {
  model?: TEditModel;
  isLoading?: boolean;
  error?: ErrorType;
}
