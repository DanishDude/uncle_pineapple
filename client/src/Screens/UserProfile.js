import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';

const UserProfile = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* <Avatar rounded source={{ uri: user.photo }} /> */}
                <View>
                    <Text>UserProfile Screen !</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: '#fff',
    },
    scrollView: {
        marginHorizontal: 5,
        marginVertical: 10,
    },
    photo: {
        resizeMode: 'contain',
        aspectRatio: 1.5,
        borderRadius: 5,
    },
    textArea: {
        marginTop: 10,
        marginLeft: 5,
        marginBottom: 10,
    },
    subSection: {
        marginBottom: 20,
    },
    subTitle: {
        marginBottom: 5,
    },
    text: {
        marginTop: 5,
    },
});

export default UserProfile;
