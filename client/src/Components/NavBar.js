import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../actions/user';

const NavBar = (props) => {
    const { navigation } = props;
    const { isLoggedIn, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handlePrivateRoute = (route) => {
        if (!isLoggedIn && token === '') {
            dispatch(requestLogin({ requestedRoute: route }));
        } else {
            navigation.navigate(route);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.btns}>
                <Button title="Home" type="outline" onPress={() => navigation.navigate('Home')} />
            </View>
            <View style={styles.btns}>
                <Button title="Recipes" type="outline" onPress={() => navigation.navigate('Recipes')} />
            </View>
            <View style={styles.btns}>
                <Button title="UserProfile" type="outline" onPress={() => handlePrivateRoute('UserProfile')} />
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
        minHeight: 60,
    },
});

export default NavBar;
