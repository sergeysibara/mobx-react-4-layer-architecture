import React from 'react';
import TodoPage from './pages/todos/views/Page';
import { ToastContainer } from 'react-toastify';
import { createBaseStore } from 'core/store/BaseStore';
import { createSearchParamsStore } from 'core/store/SearchParamsStore';
import BaseActions from 'core/actions/BaseActions';
import { IActionsContextValue, IStoresContextValue, StoresContext, ActionsContext } from './contexts';
import { createTodoAPI } from './pages/todos/api';

export const stores: IStoresContextValue = {
  todoStore: createBaseStore(),
  todoSearchParamsStore: createSearchParamsStore(),
};

export const actions: IActionsContextValue = {
  todoActions: new BaseActions(stores.todoStore, stores.todoSearchParamsStore, createTodoAPI()),
};

const App = () => {
  return (
    <div className="App">
      <StoresContext.Provider value={stores}>
        <ActionsContext.Provider value={actions}>
          <TodoPage />
        </ActionsContext.Provider>
      </StoresContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
