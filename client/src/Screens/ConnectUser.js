import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
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

    const BackIcon = () => (
        <Icon iconStyle={styles.caption} name="arrow-left" type="fontisto" color="grey" onPress={() => backAction()} />
    );
    const ErrorNotice = () => <Text style={styles.error}>{newUser.error}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            {<Text style={styles.loading}>{newUser.loading ? 'Loading ...' : ' '}</Text>}
            <View style={styles.fields}>
                {newUser.state === 'email' ? (
                    <View style={styles.field}>
                        <View style={styles.captionWrapper}>
                            <Text style={styles.caption}>Enter Your Email</Text>
                        </View>

                        <InputText
                            inputStyle={styles.input}
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
                        <View style={styles.captionWrapper}>
                            <BackIcon />
                            <Text style={styles.caption}>Hi, Welcom Back!</Text>
                        </View>
                        <View style={styles.subCaptionWrapper}>
                            <Text style={styles.subCaption}>Signing in as {newUser.email}.</Text>
                            <Button
                                titleStyle={styles.notYou}
                                title="Not You?"
                                type="clear"
                                onPress={() => backAction()}
                            />
                        </View>
                        <InputText
                            inputStyle={styles.input}
                            secureTextEntry={true}
                            placeholder="Enter Your Password"
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
                        <View style={styles.captionWrapper}>
                            <BackIcon />
                            <Text style={styles.caption}>Enter a password</Text>
                        </View>
                        <View style={styles.subCaptionWrapper}>
                            <Text style={styles.subCaption}>New profile for {newUser.email}.</Text>
                            <Button
                                titleStyle={styles.notYou}
                                title="Not You?"
                                type="clear"
                                onPress={() => backAction()}
                            />
                        </View>
                        <InputText
                            inputStyle={styles.input}
                            secureTextEntry={true}
                            placeholder="Create a Password"
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
                        <View style={styles.captionWrapper}>
                            <BackIcon />
                            <Text style={styles.caption}>Great! Confirm your password</Text>
                        </View>
                        <View style={styles.subCaptionWrapper}>
                            <Text style={styles.subCaption}>New profile for {newUser.email}.</Text>
                            <Button
                                titleStyle={styles.notYou}
                                title="Not You?"
                                type="clear"
                                onPress={() => setNewUser({ ...newUser, state: 'email', password: '', error: '' })}
                            />
                        </View>
                        <InputText
                            inputStyle={styles.input}
                            secureTextEntry={true}
                            placeholder="Confirm Your Password"
                            autoCompleteType="password"
                            keyboardType="default"
                            textContentType="newPassword"
                            onChangeText={(value) => setNewUser({ ...newUser, confirmPassword: value })}
                        />
                        <ErrorNotice />
                    </View>
                ) : undefined}
            </View>

            <View style={styles.buttons}>
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
    loading: {
        flex: 3,
        flexDirection: 'row',
        textAlign: 'center',
    },
    fields: {
        flex: 8,
    },
    field: {
        flex: 1,
        paddingTop: 20,
    },
    captionWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    caption: {
        marginHorizontal: 5,
        fontSize: 24,
    },
    subCaptionWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subCaption: {
        fontSize: 14,
    },
    notYou: {
        fontSize: 14,
    },
    input: {
        marginTop: 20,
    },
    error: {
        flex: 2,
        color: 'red',
        marginLeft: 10,
        marginBottom: 30,
    },
    buttons: {
        flex: 6,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    back: {
        left: 10,
        backgroundColor: 'grey',
    },
    next: {
        marginLeft: 10,
        width: 200,
    },
    bottom: {
        flex: 8,
    },
});

export default ConnectUser;
