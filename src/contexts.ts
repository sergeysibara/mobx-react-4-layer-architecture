import { createContext, Context } from 'react';
import BaseController from './core/controllers/BaseController';

import {
  TodoListStoreType,
  TodoEditStoreType,
  TodoSearchParamsStoreType,
} from './pages/todos/stores';
import BaseListStore from './core/stores/BaseListStore';
import BaseEditStore from './core/stores/BaseEditStore';
import SearchParamsStore from './core/stores/SearchParamsStore';
import { createTodoAPI } from './pages/todos/api';

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

export function initContextsValues() {
  const stores: IStoresContextValue = {
    todoListStore: new BaseListStore(),
    todoEditStore: new BaseEditStore(),
    todoSearchParamsStore: new SearchParamsStore(),
  };

  const controllers: IControllersContextValue = {
    todoController: new BaseController(
      stores.todoListStore,
      stores.todoEditStore,
      stores.todoSearchParamsStore,
      createTodoAPI('/todos'),
    ),
  };

  return {
    stores,
    controllers,
  };
}
