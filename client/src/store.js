// import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware  } from 'redux';
import appReducer from './redusers/reduser';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// const store = configureStore(appReducer, composeWithDevTools());
const store = createStore(appReducer, composedEnhancer);

// const unsubscribe = store.subscribe(() =>
//   console.log('State after dispatch: ', store.getState())
// )

// store.dispatch({type: 'GET_ITEMS', payload: [{a: 1}, {b: 2}]});

export default store;
