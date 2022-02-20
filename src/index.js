import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import './index.css';
import App from './pages/App/index';
import burgerReducer from "./redux/reducer/burgerReducer";
import orderReducer from "./redux/reducer/orderReducer";
import signupReducer from "./redux/reducer/signupLoginReducer";

const loggerMiddleware = store =>{
  return next => {
    return action =>{
      console.log("My logger middleware: Dispatching", action);
      console.log("State before: ", store.getState());
      const result = next(action);
      console.log("Sate after: ", store.getState());
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  burgerReducer,
  orderReducer,
  signupReducer
})

const middlewares = [loggerMiddleware, thunk];

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
