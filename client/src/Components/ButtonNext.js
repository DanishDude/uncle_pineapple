import React from 'react';
import { Button } from 'react-native-elements';

const ButtonNext = (props) => {
    const { color, disabled, onPress, style, title, type } = props;
    return <Button buttonStyle={style} title={title} type={type} color={color} disabled={disabled} onPress={onPress} />;
};

export default ButtonNext;
