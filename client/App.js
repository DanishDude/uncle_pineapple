import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import StandardCard from './src/Components/StandardCard';

export default function App(props) {
    const state = useSelector((state) => state);
    return (
        <View style={styles.container}>
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
