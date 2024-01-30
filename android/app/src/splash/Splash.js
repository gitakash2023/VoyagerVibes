import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Delay navigation to SelectionScreen after 2 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('Selection');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://pbs.twimg.com/media/DfQZTWbWsAAWQx9.jpg' }} style={styles.splashImage} />
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
