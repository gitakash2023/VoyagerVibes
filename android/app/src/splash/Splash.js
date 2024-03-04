import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if the user is already logged in
      const user = auth().currentUser;
      if (user) {
        // If user is logged in, navigate to UserHome
        navigation.navigate('UserHome');
      } else {
        // If user is not logged in, navigate to Signup
        navigation.navigate('UserSignup');
      }
    };

    // Delay navigation after 2 seconds
    const timeout = setTimeout(() => {
      checkUserLoggedIn();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://pbs.twimg.com/media/DfQZTWbWsAAWQx9.jpg' }}
        style={styles.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Splash;
