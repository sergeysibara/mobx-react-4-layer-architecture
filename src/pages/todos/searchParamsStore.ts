import SearchParamsStore, {
  IFiltersState,
} from "modules/store/SearchParamsStore";

export interface ITodoFiltersState extends IFiltersState {
  completed?: boolean;
}

export type TodoSearchParamsStoreType = SearchParamsStore<ITodoFiltersState>;

// for using in app and in tests
export const createTodoSearchParamsStore = () => ( new SearchParamsStore<ITodoFiltersState>());

