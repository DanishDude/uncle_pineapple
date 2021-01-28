import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { modifyUser } from '../actions/user';
import UserAvatar from '../Container/User/UserAvatar';

const MyProfile = (props) => {
    const { user, token } = useSelector((state) => state.user);
    const [newUser, setNewUser] = useState({ firstname: '', lastname: '', ...user });
    const dispatch = useDispatch();

    const pickImage = async () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'grated') {
                    alert('Sorry, we need camera roll permissions to update your avatar photo!');
                }
            }
        })();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let { type, uri } = result;
            const uriParts = uri.split('.');
            const fileType = uriParts[uriParts.length - 1];
            type = `image/${fileType}`;
            const name = `avatar_${user._id}.${fileType}`;
            setNewUser({ ...newUser, avatar: { uri, name, type } }, dispatch(modifyUser(newUser, token)));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.avatar}>
                    <UserAvatar size="xlarge" user={newUser} onPress={pickImage} />
                </View>

                <View style={styles.email}>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>

                <View style={styles.info}>
                    <Input
                        inputStyle={styles.input}
                        label={newUser.firstname.length ? 'First Name' : ''}
                        placeholder="First Name"
                        autoCompleteType="name"
                        textContentType="givenName"
                        onBlur={(e) => {
                            if (e.nativeEvent.text !== user.firstname) {
                                setNewUser(
                                    { ...newUser, firstname: e.nativeEvent.text },
                                    dispatch(modifyUser(newUser, token))
                                );
                            }
                        }}
                        onChangeText={(text) => setNewUser({ ...newUser, firstname: text })}
                        value={newUser.firstname}
                    />
                </View>

                <View style={styles.info}>
                    <Input
                        inputStyle={styles.input}
                        label={newUser.lastname.length ? 'Last Name' : ''}
                        placeholder="Last Name"
                        autoCompleteType="name"
                        textContentType="familyName"
                        onBlur={(e) => {
                            if (e.nativeEvent.text !== user.lastname) {
                                setNewUser(
                                    { ...newUser, lastname: e.nativeEvent.text },
                                    dispatch(modifyUser(newUser, token))
                                );
                            }
                        }}
                        onChangeText={(text) => setNewUser({ ...newUser, lastname: text })}
                        value={newUser.lastname}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        minWidth: '100%',
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        minWidth: '100%',
    },
    avatar: {
        flex: 4,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    email: {
        flex: 3,
        alignItems: 'center',
        fontSize: 28,
        marginVertical: 10,
    },
    info: {
        flex: 4,
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
    },
});

export default MyProfile;
