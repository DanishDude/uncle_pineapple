import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { getAllRecipes } from './src/actions/recipes';
import StandardCard from './src/Components/StandardCard';

export default function App(props) {
    const { error, loading, recipes } = useSelector((state) => state.recipes);
    const dispatch = useDispatch();
    useEffect(() => dispatch(getAllRecipes()), [dispatch]);

    return (
        <View style={styles.container}>
            {error ? <Text>Error loading recipes - {error}</Text> : undefined}
            {loading ? <Text>Loading...</Text> : undefined}
            {recipes?.length
                ? recipes.map((recipe) => {
                      return <StandardCard key={recipe._id} recipe={recipe} />;
                  })
                : undefined}
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
