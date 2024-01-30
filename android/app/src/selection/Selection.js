import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Selection = () => {
  const navigation = useNavigation();

  const handleUserSelection = () => {
    navigation.navigate('UserSignup');
  };

  const handleRestaurantOwnerSelection = () => {
    navigation.navigate('OwnerSignup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFD700' }]}
        onPress={handleUserSelection}
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFD700' }]}
        onPress={handleRestaurantOwnerSelection}
      >
        <Text style={styles.buttonText}>Restaurant Owner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: 200,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Selection;
