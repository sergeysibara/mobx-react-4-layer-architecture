import React from 'react';
import TodoPage from './pages/todos/views/Page';
import { ToastContainer } from 'react-toastify';
import BaseListStore from 'core/store/BaseListStore';
import BaseEditStore from 'core/store/BaseEditStore';
import SearchParamsStore from 'core/store/SearchParamsStore';
import BaseActions from 'core/actions/BaseActions';
import { IActionsContextValue, IStoresContextValue, StoresContext, ActionsContext } from './contexts';
import { createTodoAPI } from './pages/todos/api';

export const stores: IStoresContextValue = {
  todoListStore: new BaseListStore(),
  todoEditStore: new BaseEditStore(),
  todoSearchParamsStore: new SearchParamsStore(),
};

export const actions: IActionsContextValue = {
  todoActions: new BaseActions(
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
        <ActionsContext.Provider value={actions}>
          <TodoPage />
        </ActionsContext.Provider>
      </StoresContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
