// It used also in Application and tests for initialization of css, mobx, ...

import React, { createContext } from 'react';
import TodoPage from "./pages/todos/views/Page";
import { ToastContainer } from 'react-toastify';
import { configure } from "mobx"
import { createTodoStore, TodoStoreType} from "./pages/todos/store"
import { createTodoSearchParamsStore, TodoSearchParamsStoreType } from "./pages/todos/searchParamsStore";

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { createTodoActions } from "./pages/todos/actions";
import BaseActions from "./modules/actions/BaseActions";

// don't allow state modifications outside actions
configure({ enforceActions: "always" });

export interface IStoresContextValue {
  todoStore: TodoStoreType
  todoSearchParamsStore: TodoSearchParamsStoreType
}

//todo do not in tests (split App.tsx file)
export const stores: IStoresContextValue = {
  todoStore: createTodoStore(),
  todoSearchParamsStore: createTodoSearchParamsStore(),
};

export interface IActionsContextValue {
  todoActions: BaseActions
}

//todo do not in tests (split App.tsx file)
export const actions: IActionsContextValue = {
  todoActions: createTodoActions(stores.todoStore, stores.todoSearchParamsStore),
};

//todo do not use in tests
export const StoresContext = createContext<IStoresContextValue | unknown>(undefined);
export const ActionsContext = createContext<IActionsContextValue | unknown>(undefined);

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
