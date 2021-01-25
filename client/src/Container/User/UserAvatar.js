import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const MyProfile = (props) => {
    const { size, user } = props;
    const { avatar, email, firstname, lastname, likes } = user;

    const title = () => {
        let result = 'AB';
        if (firstname & lastname) {
            result = firstname[0] + lastname[0];
        } else if (firstname) {
            result = firstname[0] & firstname[1];
        } else if (lastname) {
            result = lastname[0] + lastname[1];
        } else {
            result = email[0] + email[1];
        }

        return result.toString().toUpperCase();
    };

    return <Avatar size={size} title={title()} rounded titleStyle={{ backgroundColor: '#BDBDBD' }} />;
};

export default MyProfile;
