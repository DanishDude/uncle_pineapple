import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import UserAvatar from '../Container/User/UserAvatar';

const MyProfile = (props) => {
    const { isLoggedIn, user } = useSelector((state) => state.user);
    const { avatar, email, firstname, lastname, likes } = user;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <UserAvatar size="xlarge" user={user} />
                <View>
                    <Text>{email}</Text>
                    <Text>MyProfile Screen !</Text>
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
        marginVertical: 10,
    },
});

export default MyProfile;
