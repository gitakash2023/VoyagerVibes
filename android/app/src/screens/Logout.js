import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const Logout = () => {
    const navigation = useNavigation()
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth().signOut();
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
  );
};

export default Logout;
