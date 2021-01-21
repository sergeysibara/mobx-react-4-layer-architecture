import { createContext } from "react";
import BaseActions from "./core/actions/BaseActions";

import { TodoSearchParamsStoreType, TodoStoreType } from "./pages/todos/stores";

export interface IStoresContextValue {
  todoStore: TodoStoreType
  todoSearchParamsStore: TodoSearchParamsStoreType
}

export interface IActionsContextValue {
  todoActions: BaseActions
}

export const StoresContext = createContext<IStoresContextValue | unknown>(undefined);
export const ActionsContext = createContext<IActionsContextValue | unknown>(undefined);
