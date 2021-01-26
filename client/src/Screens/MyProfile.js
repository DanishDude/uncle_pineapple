import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { modifyUser } from '../actions/user';
// import InputText from '../Components/Forms/InputText';
import UserAvatar from '../Container/User/UserAvatar';
import UserInfo from '../Container/User/UserInfo';

const MyProfile = (props) => {
    const { isLoggedIn, user, token } = useSelector((state) => state.user);
    const { avatar, email, firstname, lastname, likes } = user;
    const [newUser, setNewUser] = useState(user);
    const dispatch = useDispatch();

    const title = () => {
        let result = '';
        if (firstname && lastname) {
            result = firstname[0] + lastname[0];
        } else if (firstname) {
            result = firstname[0] + firstname[1];
        } else if (lastname) {
            result = lastname[0] + lastname[1];
        } else {
            result = email[0] + email[1];
        }
        return result.toString().toUpperCase();
    };

    const updateUser = (value, field) => {
        // dispatch update user info
        console.log(value);
        if (user[field] !== value) {
            console.log('We should update user');
            dispatch(modifyUser(newUser, token));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.avatar}>
                    <Avatar
                        rounded
                        source={{ uri: avatar }}
                        size="xlarge"
                        title={title()}
                        titleStyle={{ backgroundColor: '#BDBDBD' }}
                        onPress={() => console.log(props)}
                    />
                </View>

                <View style={styles.email}>
                    <Text style={styles.email}>{email}</Text>
                </View>
                <View style={styles.info}>
                    <Input
                        inputStyle={styles.input}
                        label="First Name"
                        placeholder="First Name"
                        autoCompleteType="name"
                        textContentType="givenName"
                        onBlur={(e) => updateUser(e.nativeEvent.text, 'firstname')}
                        onChangeText={(text) => setNewUser({ ...newUser, firstname: text })}
                        value={newUser.firstname}
                    />
                </View>
                <View style={styles.bottom}>
                    <Text>MyProfile Screen !</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // minHeight: '100%',
        minWidth: '100%',
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        // minHeight: '100%',
        minWidth: '100%',
        // marginVertical: 10,
        backgroundColor: 'blue',
    },
    avatar: {
        flex: 4,
        alignItems: 'center',
        // justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: 'green',
    },
    email: {
        flex: 3,
        alignItems: 'center',
        fontSize: 28,
        marginVertical: 10,
        backgroundColor: 'pink',
    },
    info: {
        flex: 4,
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: 'yellow',
    },
    input: {
        flex: 1,
    },
    bottom: {
        flex: 4,
        alignItems: 'center',
        backgroundColor: 'red',
    },
});

export default MyProfile;
