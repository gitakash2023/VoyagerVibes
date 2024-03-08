import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !name) {
      alert('Please add all the fields');
      return;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      await firestore().collection('users').doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        uid: result.user.uid,
        // pic: image,
        status: 'online',
      });
      setLoading(false);
    } catch (err) {
      alert('Something went wrong');
    }
  };

  const pickImageAndUpload = () => {
    launchImageLibrary({ quality: 0.5 }, async fileObj => {
      if (!fileObj.didCancel && fileObj.assets[0].uri) {
        const fileUri = fileObj.assets[0].uri;
        try {
          const downloadUrl = await uploadImageToStorage(fileUri);
          setImage(downloadUrl);
          alert('Image uploaded successfully');
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image');
        }
      }
    });
  };

  const uploadImageToStorage = async uri => {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const reference = storage().ref(`userprofile/${Date.now()}`);

    try {
      await reference.putFile(uri);
      const downloadUrl = await reference.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image to storage:', error);
      throw error;
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome to VoyagerVibes</Text>
        <Image style={styles.img} source={require('../assests/account.png')} />
      </View>
      <View style={styles.box2}>
        {!showNext && (
          <>
            <TextInput
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              mode="outlined"
            />
            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </>
        )}

        {showNext ? (
          <>
            <TextInput
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
              mode="outlined"
            />
            {/* <Button mode="contained" onPress={pickImageAndUpload}>
              Select Profile Pic
            </Button> */}
            <Button
              mode="contained"
            //   disabled={!image}
              onPress={userSignup}
            >
              Signup
            </Button>
          </>
        ) : (
          <Button mode="contained" onPress={() => setShowNext(true)}>
            Next
          </Button>
        )}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ textAlign: 'center' }}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: 'green',
    margin: 10,
  },
  img: {
    width: 200,
    height: 200,
  },
  box1: {
    alignItems: 'center',
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
});
