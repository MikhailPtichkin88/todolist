import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./app/store";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
    ,  document.getElementById('root'));
