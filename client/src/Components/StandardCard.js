import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';

const StandardCard = (props) => {
    const [recipeDisplay, setRecipeDisplay] = useState(undefined);
    const [title, setTitle] = useState('Title');
    const photo = require('../../assets/empty_plate.jpeg');

    useEffect(() => {
        fetch('http://localhost:5000/api/recipe/5ffebdeda1558030b728c799')
            .then((res) => res.json())
            .then((payload) => {
                console.log(payload);
                const { success, msg, recipe } = payload;

                if (!success) {
                    console.error(msg);
                } else if (payload.title) {
                    setTitle(payload.title);
                } else if (payload.recipe) {
                    setRecipeDisplay(recipe);
                } else {
                    setTitle('titi toto tata');
                }
            })
            .catch((err) => {
                console.error(err);
                setTitle('Error');
            });
    }, [fetch]);

    return (
        <Card>
            <Card.Title>{recipeDisplay?.title}</Card.Title>
            {recipeDisplay?.photo ? (
                <Card.Image
                    source={{ uri: recipeDisplay?.photo }}
                    placeholderStyle={{ backgroundColor: 'blue' }}
                    style={{ width: 300, height: 200 }}
                ></Card.Image>
            ) : (
                <Card.Image
                    source={require('../../assets/empty_plate.jpeg')}
                    style={{ width: 300, height: 200 }}
                ></Card.Image>
            )}
        </Card>
    );
};

export default StandardCard;
