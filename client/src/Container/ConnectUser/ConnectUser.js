import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheet, Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_API_SERVER } from '@env';
import { denyLoginRequest, login, signup } from '../../actions/user';
// import { email } from '../../Components/Forms/validate'; // validators ??
import ButtonNext from '../../Components/ButtonNext';
import InputText from '../../Components/Forms/InputText';

const ConnectUser = (props) => {
    const { error, isLoggedIn, requestLogin } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', loading: false });

    useEffect(() => {
        if (requestLogin) {
            setIsVisible(true);
        } else if (isLoggedIn) {
            console.log("Yay ! I'm in !!");
            closeBottomSheet();
        }
    }, [isLoggedIn, requestLogin]);

    const validateEmail = async () => {
        const options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: newUser.email }),
        };

        const result = await fetch(`${REACT_APP_API_SERVER}/user/${newUser.email}`)
            .then((res) => res.json())
            .then((payload) => {
                const { success, msg, isRegistered } = payload;

                if (!success) {
                    console.log(msg);
                    return setNewUser({ ...newUser, email: '', loading: false });
                } else if (success && isRegistered) {
                    return setNewUser({ ...newUser, state: 'password', loading: false });
                } else if (success && !isRegistered) {
                    return setNewUser({ ...newUser, state: 'new password', loading: false });
                }
            })
            .catch((err) => {
                console.log('Aw Snap :-/ ', err);
                return setNewUser({ ...newUser, email: '', loading: false });
            });

        return result;
    };

    const updateUserState = () => {
        newUser.loading = true;

        const { email, password } = newUser;

        if (!newUser.state) {
            validateEmail();
        } else if (newUser.state === 'password') {
            dispatch(login({ email, password }));
        } else if (newUser.state === 'new password') {
            dispatch(signup({ email, password }));
        }
    };

    const closeBottomSheet = () => {
        setIsVisible(false);
        dispatch(denyLoginRequest());
        setNewUser({ email: '', loading: false });
    };

    return (
        <BottomSheet isVisible={isVisible} containerStyle={styles.container}>
            <Text style={styles.caption} onPress={() => closeBottomSheet()}>
                Hey! Let's login
            </Text>
            <Text style={{ color: 'red' }}>{error}</Text>
            {newUser.loading ? <Text style={{ color: 'green' }}>Loading ...</Text> : undefined}
            {!newUser.state ? (
                <View>
                    <InputText
                        placeholder="uncle.pineapple@mail.com"
                        onChangeText={(value) => setNewUser({ ...newUser, email: value })}
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
                        onChangeText={(value) => setNewUser({ ...newUser, password: value })}
                    />
                </View>
            ) : undefined}

            {newUser.state === 'new password' ? <Text>Welcome ! Create a new profile</Text> : undefined}

            {/* <ButtonNext style={styles.next} title="Next" /> */}
            <Button buttonStyle={styles.next} title="Next" onPress={() => updateUserState()} />
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
        backgroundColor: 'red',
    },
    email: {
        marginTop: 15,
        backgroundColor: 'yellow',
    },
    next: {
        marginTop: 10,
    },
});

export default ConnectUser;
