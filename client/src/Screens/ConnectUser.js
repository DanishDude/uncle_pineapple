import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_API_SERVER } from '@env';
import { emailFormat } from '../Components/Forms/validation';
import { login, signup } from '../actions/user';
import InputText from '../Components/Forms/InputText';

const ConnectUser = (props) => {
    const { navigation } = props;
    const [newUser, setNewUser] = useState({ state: 'email', email: '', loading: false });
    const { context, error, isLoggedIn, token } = useSelector((state) => state.user);
    const { requestedRoute } = context;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn && token !== '') {
            navigation.dispatch({ ...StackActions.replace(requestedRoute, {}) });
        }

        return () => setNewUser({ state: 'email', email: '', loading: false });
    }, [isLoggedIn, navigation, requestedRoute, token]);

    useEffect(() => {
        if (error) {
            setNewUser({ ...newUser, error: error });
        }
    }, [error]);

    const isEmailRegistered = async () => {
        const result = await fetch(`${REACT_APP_API_SERVER}/user/${newUser.email}`)
            .then((res) => res.json())
            .then((payload) => {
                const { success, msg, isRegistered } = payload;

                if (!success) {
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
                return setNewUser({ ...newUser, email: '', loading: false });
            });

        return result;
    };

    const nextAction = () => {
        setNewUser({ ...newUser, loading: true, error: '' });
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
        switch (newUser.state) {
            case 'password':
                return setNewUser({ ...newUser, state: 'email', password: '', error: '' });
            case 'new password':
                return setNewUser({ ...newUser, state: 'email', password: '', error: '' });
            case 'confirm password':
                return setNewUser({ ...newUser, state: 'new password', confirmPassword: '', error: '' });
            default:
                return;
        }
    };

    const nextButton = () => {
        switch (newUser.state) {
            case 'password':
                return 'Login';
            case 'confirm password':
                return 'Continue';
            default:
                return 'Next';
        }
    };

    const ErrorNotice = () => <Text style={styles.error}>{newUser.error}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            {<Text style={styles.loading}>{newUser.loading ? 'Loading ...' : ' '}</Text>}
            <View style={styles.fields}>
                {newUser.state === 'email' ? (
                    <View style={styles.field}>
                        <Text style={styles.caption}>Enter your email</Text>

                        <InputText
                            placeholder="uncle.pineapple@mail.com"
                            autoCompleteType="email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            onChangeText={(value) => setNewUser({ ...newUser, email: value.toLowerCase() })}
                            value={newUser.email}
                        />
                        <ErrorNotice />
                    </View>
                ) : undefined}

                {newUser.state === 'password' ? (
                    <View style={styles.field}>
                        <Text style={styles.email}>{newUser.email}</Text>
                        <Text style={styles.caption}>Welcome Back! Enter your password</Text>
                        <InputText
                            secureTextEntry={true}
                            placeholder="Nachos"
                            autoCompleteType="password"
                            keyboardType="default"
                            textContentType="password"
                            onChangeText={(value) => setNewUser({ ...newUser, password: value })}
                            value={newUser.password}
                        />
                        <ErrorNotice />
                    </View>
                ) : undefined}

                {newUser.state === 'new password' ? (
                    <View style={styles.field}>
                        <Text style={styles.email}>{newUser.email}</Text>
                        <Text style={styles.caption}>Enter a password</Text>
                        <InputText
                            secureTextEntry={true}
                            placeholder="Nachos"
                            autoCompleteType="password"
                            keyboardType="default"
                            textContentType="newPassword"
                            onChangeText={(value) => setNewUser({ ...newUser, password: value })}
                        />
                        <ErrorNotice />
                    </View>
                ) : undefined}

                {newUser.state === 'confirm password' ? (
                    <View style={styles.field}>
                        <Text style={styles.email}>{newUser.email}</Text>
                        <Text style={styles.caption}>Great ! Confirm your password</Text>
                        <InputText
                            secureTextEntry={true}
                            placeholder=""
                            autoCompleteType="password"
                            keyboardType="default"
                            textContentType="newPassword"
                            onChangeText={(value) => setNewUser({ ...newUser, confirmPassword: value })}
                        />
                        <ErrorNotice />
                    </View>
                ) : undefined}
            </View>

            <View style={styles.btns}>
                <View style={styles.buttons}></View>
                {newUser.state !== 'email' ? (
                    <Button buttonStyle={styles.back} title="Back" onPress={() => backAction()} />
                ) : undefined}
                <Button buttonStyle={styles.next} title={nextButton()} onPress={() => nextAction()} />
            </View>
            <View style={styles.bottom}></View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    fields: {
        flex: 8,
    },
    field: {
        flex: 1,
    },
    caption: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
    },
    loading: {
        flex: 2,
        flexDirection: 'row',
        textAlign: 'center',
    },
    error: {
        flex: 1,
        color: 'red',
        marginLeft: 10,
    },
    email: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    btns: {
        flex: 6,
        marginLeft: 100,
        marginRight: 100,
    },
    buttons: { flex: 1, flexDirection: 'row' },
    back: {
        backgroundColor: 'grey',
    },
    next: {
        marginTop: 10,
    },
    bottom: {
        flex: 10,
    },
});

export default ConnectUser;
