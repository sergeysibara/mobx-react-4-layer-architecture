// It used also in Application and tests for initialization of css, mobx, ...

import React, { createContext } from 'react';
import TodoPage from "./pages/todos/views/Page";
import { ToastContainer } from 'react-toastify';
import { configure } from "mobx"
import { createTodoStore} from "./pages/todos/store"

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

// don't allow state modifications outside actions
configure({ enforceActions: "always" });

export const stores = {
  todoStore: createTodoStore(),
};

export const StoresContext = createContext(stores);

const App = () => {
  return (
    <div className="App">
      <StoresContext.Provider value={stores}>
        <TodoPage />
      </StoresContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
