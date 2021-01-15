import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StandardCard from './src/Components/StandardCard';

export default function App(props) {
    return (
        <View style={styles.container}>
            <Text>{props.toto}</Text>
            <Text>Uncle Pineapple</Text>
            <StandardCard />
            <StatusBar style="auto" />
        </View>
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
