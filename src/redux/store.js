import { reducer } from './reducer';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export let store = createStore(reducer, applyMiddleware(thunk, logger));

// console.log('store', store.getState());
