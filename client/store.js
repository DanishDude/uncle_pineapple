import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import recipes from './src/reducers/recipes';

const allReducers = combineReducers({
    recipes,
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
