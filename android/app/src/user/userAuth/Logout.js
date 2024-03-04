import React from 'react';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.navigate('UserLogin');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return <Button title="Logout" onPress={handleLogout} />;
};

export default Logout;
