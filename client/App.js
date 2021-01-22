import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import ConnectUser from './src/Container/ConnectUser/ConnectUser';
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
                {/* <Stack.Screen name="ConnectUser" component={ConnectUser} /> */}
            </Stack.Navigator>
            <ConnectUser {...props} />
            <StatusBar style="auto" />
        </Fragment>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         alignSelf: 'stretch',
//     },
// });
