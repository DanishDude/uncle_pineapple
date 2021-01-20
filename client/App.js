import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ConnectUser from './src/Components/ConnectUser';
import Home from './src/Screens/Home';
import Recipe from './src/Screens/Recipe';
import Recipes from './src/Screens/Recipes';
import UserProfile from './src/Screens/UserProfile';

const Stack = createStackNavigator();

export default function App(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Recipe" component={Recipe} />
                <Stack.Screen name="Recipes" component={Recipes} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
            </Stack.Navigator>
            <ConnectUser />
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
