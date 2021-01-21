import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheet, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { denyLoginRequest } from '../actions/user';

const ConnectUser = (props) => {
    const { requestLogin } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (requestLogin) {
            setIsVisible(true);
        }
    }, [requestLogin]);

    const closeBottomSheet = () => {
        setIsVisible(false);
        dispatch(denyLoginRequest());
    };

    return (
        <BottomSheet isVisible={isVisible} containerStyle={styles.container}>
            <Text style={styles.caption} onPress={() => closeBottomSheet()}>
                Hey! Login to go here ...
            </Text>
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
        backgroundColor: 'red',
    },
});

export default ConnectUser;
