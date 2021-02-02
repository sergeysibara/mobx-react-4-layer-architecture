import { createContext, Context } from 'react';
import BaseController from './core/controllers/BaseController';

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

export interface IControllersContextValue {
  todoController: BaseController;
}

const StoresContext = createContext<IStoresContextValue | null>(
  null,
) as Context<IStoresContextValue>;
const ControllersContext = createContext<IControllersContextValue | null>(
  null,
) as Context<IControllersContextValue>;

export { StoresContext, ControllersContext };
