import IIdentifiable from "modules/types/IIdentifiable";
import BaseStore from "modules/store/BaseStore";
import SearchParamsStore, { IFiltersState } from "modules/store/SearchParamsStore";

export interface ITodoModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

export type TodoStoreType = BaseStore<ITodoModel, ITodoModel>;


export interface ITodoFiltersState extends IFiltersState {
  completed?: boolean;
}

export type TodoSearchParamsStoreType = SearchParamsStore<ITodoFiltersState>;
