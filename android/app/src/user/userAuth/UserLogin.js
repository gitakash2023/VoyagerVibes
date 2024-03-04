import React, { useState } from 'react';
import { View, Text, StyleSheet ,Alert} from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('UserProfile');
      Alert.alert('User logged in successfully!', userCredential.user.uid);
    } catch (error) {
      Alert.alert('Error logging in:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Button>
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('UserSignup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color:"black"
  },
  input: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: 'yellow',
  },
  buttonText: {
    color: 'black',
  },
  signupText: {
    marginTop: 10,
    color:"black"
  },
  signupLink: {
    color: 'blue',
  },
});

export default UserLogin;
