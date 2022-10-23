// import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import appReducer from './redusers/reduser';
import { composeWithDevTools } from 'redux-devtools-extension';

// const store = configureStore(appReducer, composeWithDevTools());
const store = createStore(appReducer, composeWithDevTools());

// const unsubscribe = store.subscribe(() =>
//   console.log('State after dispatch: ', store.getState())
// )

// store.dispatch({type: 'GET_ITEMS', payload: [{a: 1}, {b: 2}]});

export default store;