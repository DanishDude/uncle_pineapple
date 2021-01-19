import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../actions/recipes';
import StandardCard from '../Components/StandardCard';

const Recipe = (props) => {
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
