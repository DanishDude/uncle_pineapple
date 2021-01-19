import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

const NavBar = (props) => {
    const { navigation } = props;

    return (
        <View style={styles.container}>
            <View style={styles.btns}>
                <Button title="Home" type="outline" onPress={() => navigation.navigate('Home')} />
            </View>
            <View style={styles.btns}>
                <Button title="Recipes" type="outline" onPress={() => navigation.navigate('Recipes')} />
            </View>
            <View style={styles.btns}>
                <Button title="UserProfile" type="outline" onPress={() => navigation.navigate('UserProfile')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    btns: {
        flex: 1,
    },
});

export default NavBar;
