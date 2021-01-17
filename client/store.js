import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import recipes from './src/reducers/recipes';

const allReducers = combineReducers({
    recipes,
});

const store = createStore(
    allReducers,
    applyMiddleware(thunk),
    composeWithDevTools(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
