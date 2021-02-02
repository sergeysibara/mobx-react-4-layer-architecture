import { createContext, Context } from 'react';
import BaseActions from './core/actions/BaseActions';

import {
  TodoListStoreType,
  TodoEditStoreType,
  TodoSearchParamsStoreType,
} from './pages/todos/stores';

export interface IStoresContextValue {
  todoListStore: TodoListStoreType;
  todoEditStore: TodoEditStoreType;
  todoSearchParamsStore: TodoSearchParamsStoreType;
}

export interface IActionsContextValue {
  todoActions: BaseActions;
}

export const StoresContext = createContext<IStoresContextValue | null>(
  null,
) as Context<IStoresContextValue>;
export const ActionsContext = createContext<IActionsContextValue | null>(
  null,
) as Context<IActionsContextValue>;
