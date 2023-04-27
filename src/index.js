import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './features/app/App';
import reportWebVitals from './reportWebVitals';
import {reduser} from "./additional/store";
import {Provider, } from "react-redux";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./additional/store/saga";
import OnLoader from "./additional/hooks/AuthFolder/OnLoader";
import {LoaderProvider} from "./additional/hooks/LoaderFolder/LoaderProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reduser,  applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <LoaderProvider>
              <OnLoader>
                  <App />
              </OnLoader>
          </LoaderProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your features, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
