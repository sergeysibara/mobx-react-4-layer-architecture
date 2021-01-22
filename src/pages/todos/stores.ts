import IIdentifiable from 'core/types/IIdentifiable';
import BaseStore from 'core/store/BaseStore';
import SearchParamsStore, { IFiltersState } from 'core/store/SearchParamsStore';

export interface ITodoModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

export type TodoStoreType = BaseStore<ITodoModel, ITodoModel>;

export interface ITodoFiltersState extends IFiltersState {
  completed?: boolean;
}

export type TodoSearchParamsStoreType = SearchParamsStore<ITodoFiltersState>;
