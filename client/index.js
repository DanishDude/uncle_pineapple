import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import store from './store.js';
import App from './App.js';

const rootComponent = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </Provider>
    );
};

export default registerRootComponent(rootComponent);
