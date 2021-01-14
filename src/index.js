import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./scss/styles.scss"
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import MyMUITheme from './helpers/MyMUITheme';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./store/reducer";
import thunk from "redux-thunk";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import DateFnsUtils from '@date-io/date-fns';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory()

const store = createStore(reducer, compose(
  applyMiddleware(thunk)
));


ReactDOM.render(
  <Router >
    {/* <React.StrictMode> */}

    <Provider store={store} >
      <MyMUITheme>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </MyMUITheme>
    </Provider>

    {/* </React.StrictMode> */}
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
