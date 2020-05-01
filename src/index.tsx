import React from 'react';
import ReactDOM from 'react-dom';
import TodoPage from "./pages/todos/views/Page";

import './styles.css';

const App = () => {
  return (
    <div className="App">
      <TodoPage />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
