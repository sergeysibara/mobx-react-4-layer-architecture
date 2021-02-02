import React from 'react';
import TodoPage from './pages/todos/views/Page';
import { ToastContainer } from 'react-toastify';
import BaseListStore from 'core/stores/BaseListStore';
import BaseEditStore from 'core/stores/BaseEditStore';
import SearchParamsStore from 'core/stores/SearchParamsStore';
import BaseController from 'core/controllers/BaseController';
import {
  IStoresContextValue,
  IControllersContextValue,
  StoresContext,
  ControllersContext,
} from './contexts';
import { createTodoAPI } from './pages/todos/api';

export const stores: IStoresContextValue = {
  todoListStore: new BaseListStore(),
  todoEditStore: new BaseEditStore(),
  todoSearchParamsStore: new SearchParamsStore(),
};

export const controllers: IControllersContextValue = {
  todoController: new BaseController(
    stores.todoListStore,
    stores.todoEditStore,
    stores.todoSearchParamsStore,
    createTodoAPI('/todos'),
  ),
};

const App = () => {
  return (
    <div className="App">
      <StoresContext.Provider value={stores}>
        <ControllersContext.Provider value={controllers}>
          <TodoPage />
        </ControllersContext.Provider>
      </StoresContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
