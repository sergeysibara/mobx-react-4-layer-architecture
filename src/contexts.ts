import { createContext } from 'react';
import BaseActions from './core/actions/BaseActions';

import { TodoListStoreType, TodoEditStoreType, TodoSearchParamsStoreType } from './pages/todos/stores';

export interface IStoresContextValue {
  todoListStore: TodoListStoreType;
  todoEditStore: TodoEditStoreType;
  todoSearchParamsStore: TodoSearchParamsStoreType;
}

export interface IActionsContextValue {
  todoActions: BaseActions;
}

export const StoresContext = createContext<IStoresContextValue | unknown>(undefined);
export const ActionsContext = createContext<IActionsContextValue | unknown>(undefined);
