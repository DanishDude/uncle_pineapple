import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import InputText from '../../Components/Forms/InputText';

const UserInfo = (props) => {
    const { email, firstname, lastname } = props.user;
    return (
        <View style={styles.container}>
            <Text style={styles.email}>{email}</Text>
            <Text>MyProfile Screen !</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
    },
    email: {
        fontSize: 32,
    },
});

export default UserInfo;
