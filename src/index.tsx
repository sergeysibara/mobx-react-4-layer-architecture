import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure } from 'mobx';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

// don't allow state modifications outside controllers
configure({ enforceActions: 'always' });

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
