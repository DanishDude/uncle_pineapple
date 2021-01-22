import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheet, Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_API_SERVER } from '@env';
import { emailFormat } from '../../Components/Forms/validation';
import { denyLoginRequest, login, signup } from '../../actions/user';
import InputText from '../../Components/Forms/InputText';

const ConnectUser = (props) => {
    console.log('CU props ', props);
    const { context, error, isLoggedIn, requestLogin, user, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [newUser, setNewUser] = useState({ state: 'email', email: '', loading: false });

    useEffect(() => {
        if (requestLogin) {
            setIsVisible(true);
        }
    }, [isLoggedIn, requestLogin]);

    useEffect(() => {
        if (isLoggedIn) {
            setNewUser({ ...newUser, loading: false });
            closeBottomSheet();
            // props.navigation.navigate(context.requestedRoute);
        }

        return closeBottomSheet();
    }, [isLoggedIn]);

    const isEmailRegistered = async () => {
        const result = await fetch(`${REACT_APP_API_SERVER}/user/${newUser.email}`)
            .then((res) => res.json())
            .then((payload) => {
                const { success, msg, isRegistered } = payload;

                if (!success) {
                    console.log(msg);
                    return setNewUser({
                        ...newUser,
                        email: '',
                        loading: false,
                        error: 'Aw Snap :-/ Network error. Please try agian',
                    });
                } else if (success && isRegistered) {
                    return setNewUser({ ...newUser, state: 'password', loading: false, error: '' });
                } else if (success && !isRegistered) {
                    return setNewUser({ ...newUser, state: 'new password', loading: false, error: '' });
                }
            })
            .catch((err) => {
                console.log('Aw Snap :-/ ', err);
                return setNewUser({ ...newUser, email: '', loading: false });
            });

        return result;
    };

    const nextAction = () => {
        setNewUser({ ...newUser, loading: true, error: '' });
        console.log(newUser);
        const { email, password, confirmPassword } = newUser;

        switch (newUser.state) {
            case 'email':
                if (emailFormat(email)) {
                    return isEmailRegistered();
                } else {
                    return setNewUser({ ...newUser, error: 'Invalid Email format' });
                }
            case 'password':
                if (!password?.length) {
                    return setNewUser({ ...newUser, error: 'Please enter a password' });
                } else {
                    setNewUser({ ...newUser, error: '' });
                    return dispatch(login({ email, password }));
                }
            case 'new password':
                // TODO add password rules
                if (!password?.length) {
                    return setNewUser({ ...newUser, error: 'Please enter a password' });
                } else {
                    return setNewUser({ ...newUser, state: 'confirm password', error: '' });
                }
            case 'confirm password':
                if (password !== confirmPassword) {
                    return setNewUser({ ...newUser, error: 'Passwords do not match' });
                } else {
                    return dispatch(signup({ email, password }));
                }
            default:
                return;
        }
    };

    const backAction = () => {
        console.log('NU: ', newUser);
        switch (newUser.state) {
            case 'password':
                return setNewUser({ ...newUser, state: 'email', password: '', error: '' });
            case 'new password':
                return setNewUser({ ...newUser, state: 'email', password: '', error: '' });
            case 'confirm password':
                return setNewUser({ ...newUser, state: 'new password', confirmPassword: '', error: '' });
                console.log(newUser);
                return;
            default:
                return;
        }
    };

    const closeBottomSheet = () => {
        setIsVisible(false);
        dispatch(denyLoginRequest());
        setNewUser({ state: 'email', email: '', loading: false });
    };

    return (
        <BottomSheet isVisible={isVisible} containerStyle={styles.container}>
            <Text style={styles.caption} onPress={() => closeBottomSheet()}>
                Hey! Let's login
            </Text>
            {newUser.loading ? <Text style={{ color: 'green' }}>Loading ...</Text> : undefined}

            {newUser.state === 'email' ? (
                <View>
                    <InputText
                        placeholder="uncle.pineapple@mail.com"
                        autoCompleteType="email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        onChangeText={(value) => setNewUser({ ...newUser, email: value.toLowerCase() })}
                        value={newUser.email}
                    />
                </View>
            ) : undefined}

            {newUser.state === 'password' ? (
                <View>
                    <Text>You are registered - Please enter your password</Text>
                    <Text style={styles.email}>{newUser.email}</Text>
                    <InputText
                        secureTextEntry={true}
                        placeholder="Nachos"
                        autoCompleteType="password"
                        keyboardType="default"
                        textContentType="password"
                        onChangeText={(value) => setNewUser({ ...newUser, password: value })}
                        value={newUser.password}
                    />
                </View>
            ) : undefined}

            {newUser.state === 'new password' ? (
                <View>
                    <Text>Welcome ! Create a password for your profile</Text>
                    <Text style={styles.email}>{newUser.email}</Text>
                    <InputText
                        secureTextEntry={true}
                        placeholder="Nachos"
                        autoCompleteType="password"
                        keyboardType="default"
                        textContentType="newPassword"
                        onChangeText={(value) => setNewUser({ ...newUser, password: value })}
                    />
                </View>
            ) : undefined}

            {newUser.state === 'confirm password' ? (
                <View>
                    <Text>Great ! Confirm your password</Text>
                    <Text style={styles.email}>{newUser.email}</Text>
                    <InputText
                        secureTextEntry={true}
                        placeholder=""
                        autoCompleteType="password"
                        keyboardType="default"
                        textContentType="newPassword"
                        onChangeText={(value) => setNewUser({ ...newUser, confirmPassword: value })}
                    />
                </View>
            ) : undefined}

            <Text style={{ color: 'red' }}>{newUser.error}</Text>
            <View>
                {newUser.state !== 'email' ? (
                    <Button buttonStyle={styles.back} title="Back" onPress={() => backAction()} />
                ) : undefined}
                <Button buttonStyle={styles.next} title="Next" onPress={() => nextAction()} />
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    caption: {
        marginTop: 65,
        marginBottom: 15,
        backgroundColor: 'yellow',
    },
    error: {
        color: 'red',
    },
    email: {
        marginTop: 15,
    },
    btns: {
        flex: 1,
        flexDirection: 'row',
    },
    back: {
        backgroundColor: 'grey',
    },
    next: {
        marginTop: 10,
    },
});

export default ConnectUser;
