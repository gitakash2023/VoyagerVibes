import React, { useState } from 'react';
import { View, Text, StyleSheet ,Alert} from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserSignup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

     
      navigation.navigate('UserProfile')

      Alert.alert('User signed up successfully!', userCredential.user.uid);
    } catch (error) {
      Alert.alert('Error signing up:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
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
        onPress={handleSignup}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </Button>
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Login
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
  loginText: {
    marginTop: 10,
    color:"black"
  },
  loginLink: {
    color: 'blue',
  },
});

export default UserSignup;
