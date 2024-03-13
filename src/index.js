import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './states/store';
import '../node_modules/react-bootstrap/dist/react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    
  <BrowserRouter>
    <App />
  </BrowserRouter>

  </Provider>
);

reportWebVitals();
