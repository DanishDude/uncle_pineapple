import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ConnectUser from './src/Screens/ConnectUser';
import Home from './src/Screens/Home';
import Recipe from './src/Screens/Recipe';
import Recipes from './src/Screens/Recipes';
import UserProfile from './src/Screens/UserProfile';

const Stack = createStackNavigator();

export default function App(props) {
    console.log('App Props ', props);
    return (
        <Fragment>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Recipe" component={Recipe} />
                <Stack.Screen name="Recipes" component={Recipes} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="ConnectUser" component={ConnectUser} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </Fragment>
    );
}
