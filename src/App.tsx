import React from 'react';
import TodoPage from "./pages/todos/views/Page";
import { ToastContainer } from 'react-toastify';
import initStylesAndConfig from "initStylesAndConfig";
import { createTodoStore} from "./pages/todos/store"
import { createTodoSearchParamsStore } from "./pages/todos/searchParamsStore";
import { createTodoActions } from "./pages/todos/actions";
import { IActionsContextValue, IStoresContextValue, StoresContext, ActionsContext } from "./contexts";

initStylesAndConfig();

export const stores: IStoresContextValue = {
  todoStore: createTodoStore(),
  todoSearchParamsStore: createTodoSearchParamsStore(),
};

export const actions: IActionsContextValue = {
  todoActions: createTodoActions(stores.todoStore, stores.todoSearchParamsStore),
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
