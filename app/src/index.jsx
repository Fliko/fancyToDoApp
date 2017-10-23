import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import reducer from './reducers/reducer';

//uncomment parameter in createStore for redux tools RECOMMENT WHEN SUBMITTING CODE!
const store = createStore(reducer/*,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
