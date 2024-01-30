// UserLogin.js
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await auth().signInWithEmailAndPassword(email, password);
      // Authentication successful, navigate to home
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      console.error('Login failed', error.message);
      // Handle login failure (show an error message, etc.)
    }
  };

  return (
    <View style={{ padding: 16, flex: 1, justifyContent: 'center' }}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ marginBottom: 16 }}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={{ marginBottom: 16 }}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        disabled={loading}
        style={{ marginTop: 16 }}
      >
        Login
      </Button>

      {loading && <ActivityIndicator animating={true} color="#0000ff" style={{ marginTop: 16 }} />}

    </View>
  );
};

export default UserLogin;
