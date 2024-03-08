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
        navigation.navigate('HomeScreen');
      } else {
        // If user is not logged in, navigate to Signup
        navigation.navigate('SignupScreen');
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
        source={{ uri: 'https://herobot.app/wp-content/uploads/2022/11/11-Reasons-Why-A-Chat-Application-Is-Great-For-Business_1.jpg' }}
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
