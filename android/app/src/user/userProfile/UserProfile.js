// UserProfile.js
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async () => {
    try {
      if (!firstName || !lastName || !gender || !phoneNumber) {
        // Display an error message if any of the required fields are empty
        Alert.alert('Error', 'All fields are required');
        return;
      }

      setLoading(true);

      // Save the user profile data to Firestore
      await firestore().collection('userProfile').add({
        firstName,
        lastName,
        gender,
        phoneNumber,
      });

      // Display success message, clear input fields, and navigate to UserHome
      Alert.alert('Success', 'User profile created successfully', [
        {
          text: 'OK',
          onPress: () => {
            setFirstName('');
            setLastName('');
            setGender('');
            setPhoneNumber('');
            setLoading(false);
            navigation.navigate('UserHome'); // Navigate to UserHome screen
          },
        },
      ]);
    } catch (error) {
      console.error('Error creating user profile', error);
      Alert.alert('Error', 'Failed to create user profile');
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16, flex: 1, justifyContent: 'center', borderRadius: 15, backgroundColor: '#fff' }}>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={{ marginBottom: 16, borderRadius: 20, backgroundColor: '#fff' }}
      />

      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={{ marginBottom: 16, borderRadius: 20, backgroundColor: '#fff' }}
      />

      <TextInput
        label="Gender"
        value={gender}
        onChangeText={(text) => setGender(text)}
        style={{ marginBottom: 16, borderRadius: 20, backgroundColor: '#fff' }}
      />

      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
        style={{ marginBottom: 16, borderRadius: 20, backgroundColor: '#fff' }}
      />

      <Button
        mode="contained"
        onPress={handleSaveProfile}
        disabled={loading}
        style={{ marginTop: 16, backgroundColor: '#FFEB3B', borderRadius: 15 }}
        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
      >
        {loading ? (
          <ActivityIndicator animating={true} color="#0000ff" />
        ) : (
          'Save Profile'
        )}
      </Button>
    </View>
  );
};

export default UserProfile;
