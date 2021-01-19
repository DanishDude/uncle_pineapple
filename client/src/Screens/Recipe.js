import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';

const Recipe = (props) => {
    const { navigation, route } = props;
    const { recipe } = route.params;
    const photo = require('../../assets/empty_plate.jpeg');

    useEffect(() => {
        navigation.setOptions({ title: recipe.title });
    }, [navigation, recipe]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Image source={recipe.photo ? { uri: recipe.photo } : photo} containerStyle={styles.photo} />
                <View style={styles.textArea}>
                    {recipe.ingredients ? (
                        <View style={styles.subSection}>
                            <Text h4 h4Style={styles.subTitle}>
                                Ingredients
                            </Text>
                            {recipe.ingredients.map((ingredient) => {
                                return (
                                    <Text key={ingredient._id}>
                                        - {`${ingredient.qty} ${ingredient.unit} ${ingredient.name}`}
                                    </Text>
                                );
                            })}
                        </View>
                    ) : undefined}
                    {recipe.method ? (
                        <View style={styles.subSection}>
                            <Text h4 h4Style={styles.subTitle}>
                                Method
                            </Text>
                            <Text>{recipe.method}</Text>
                        </View>
                    ) : undefined}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: '#fff',
    },
    scrollView: {
        marginHorizontal: 5,
        marginVertical: 5,
    },
    photo: {
        resizeMode: 'contain',
        aspectRatio: 1.5,
        borderRadius: 5,
    },
    textArea: {
        marginTop: 10,
        marginLeft: 5,
        marginBottom: 10,
    },
    subSection: {
        marginBottom: 20,
    },
    subTitle: {
        marginBottom: 5,
    },
    text: {
        marginTop: 5,
    },
});

export default Recipe;
