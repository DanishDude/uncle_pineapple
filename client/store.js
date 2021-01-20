import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import recipes from './src/reducers/recipes';
import user from './src/reducers/user';

const allReducers = combineReducers({
    recipes,
    user,
});

const store = createStore(
    allReducers,
    applyMiddleware(thunk),
    composeWithDevTools(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
