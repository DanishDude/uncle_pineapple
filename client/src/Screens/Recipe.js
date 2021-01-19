import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from '../actions/recipes';
import StandardCard from '../Components/StandardCard';

const Recipe = (props) => {
    const { navigation, route } = props;
    const { recipe } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: recipe.title });
    }, [navigation, recipe]);

    return (
        <View style={styles.container}>
            <Text>The Recipe Screen - Yay!</Text>
            <Text>{recipe.title}</Text>
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

export default Recipe;
