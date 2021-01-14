import React from 'react';
import ReactDOM from 'react-dom';
import TodoPage from "./pages/todos/views/Page";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const App = () => {
  return (
    <div className="App">
      <TodoPage />
      <ToastContainer />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
