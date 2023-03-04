import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {store} from "./redux/store";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import tr from 'javascript-time-ago/locale/tr.json'


import App from './App';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(tr)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      <App />

    </Provider>

   
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

