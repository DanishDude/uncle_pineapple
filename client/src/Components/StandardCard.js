import React from 'react';
import { Pressable, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';

const StandardCard = (props) => {
    const { navigation, recipe } = props;
    const photo = require('../../assets/empty_plate.jpeg');

    const goToRecipe = () => {
        navigation.navigate('Recipe', { recipe });
    };

    return (
        <Pressable onPress={goToRecipe}>
            <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
                <Card.Title style={{ marginTop: 3, marginBottom: 3, fontSize: 16 }}>{recipe?.title}</Card.Title>
                <Card.Image
                    source={recipe.photo ? { uri: recipe.photo } : photo}
                    style={{ width: 300, height: 200, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                ></Card.Image>
            </Card>
        </Pressable>
    );
};

export default StandardCard;
