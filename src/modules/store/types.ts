export interface BaseModel {
  id: number;
}

export type ErrorType = string | object;
export type FiltersType = Record<string, string | number | boolean>;

export interface ListModule<TListItem> {
  results: TListItem[];
  count?: number; // number of all items on server
  isLoading?: boolean;
  error?: ErrorType;
}

export interface SearchParams {
  filters: FiltersType;
  sorting?: string;
  paging: {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
  };
}

export interface EditModule<TeditModel> {
  model?: TeditModel;
  isLoading?: boolean;
  error?: ErrorType;
}
