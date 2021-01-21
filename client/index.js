import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import store from './store.js';
import App from './App.js';

const rootComponent = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default registerRootComponent(rootComponent);
