import React, { useEffect, useState } from 'react';
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
        <BottomSheet isVisible={isVisible} containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
            <Text onPress={() => closeBottomSheet()}>Hello There!</Text>
        </BottomSheet>
    );
};

export default ConnectUser;
