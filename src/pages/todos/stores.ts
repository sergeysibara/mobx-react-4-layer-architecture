import { IIdentifiable } from 'core/types';
import BaseListStore from 'core/store/BaseListStore';
import BaseEditStore from 'core/store/BaseEditStore';
import SearchParamsStore, { IFiltersState } from 'core/store/SearchParamsStore';

export interface ITodoModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

export type TodoListStoreType = BaseListStore<ITodoModel>;
export type TodoEditStoreType = BaseEditStore<ITodoModel>;

export interface ITodoFiltersState extends IFiltersState {
  completed?: boolean;
}

export type TodoSearchParamsStoreType = SearchParamsStore<ITodoFiltersState>;
