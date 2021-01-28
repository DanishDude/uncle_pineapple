import React from 'react';
import { Avatar } from 'react-native-elements';

const MyProfile = (props) => {
    const { onPress, size, user } = props;
    const { avatar, email, firstname, lastname } = user;

    const avatarPhoto = typeof avatar === 'string' ? avatar : avatar.uri;

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

    return (
        <Avatar
            rounded
            source={{ uri: avatarPhoto }}
            size={size}
            title={title()}
            titleStyle={{ backgroundColor: '#BDBDBD' }}
            onPress={onPress}
        />
    );
};

export default MyProfile;
