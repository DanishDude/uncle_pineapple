import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from '../Components/NavBar';

const Home = (props) => {
    return (
        <View style={styles.container}>
            <Text>Home Screen !</Text>
            <NavBar {...props} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;
