//todo do not use in tests
import { createContext } from "react";
import BaseActions from "./modules/actions/BaseActions";
import { TodoStoreType } from "./pages/todos/store";
import { TodoSearchParamsStoreType } from "./pages/todos/searchParamsStore";

export interface IStoresContextValue {
  todoStore: TodoStoreType
  todoSearchParamsStore: TodoSearchParamsStoreType
}

export interface IActionsContextValue {
  todoActions: BaseActions
}

export const StoresContext = createContext<IStoresContextValue | unknown>(undefined);
export const ActionsContext = createContext<IActionsContextValue | unknown>(undefined);
