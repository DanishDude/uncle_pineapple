import React from 'react';
import App from './App.js';

import store from './store.js';

import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

const rootComponent = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default registerRootComponent(rootComponent);
