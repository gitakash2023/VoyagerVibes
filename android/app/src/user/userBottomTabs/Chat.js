import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('userProfile')
      .onSnapshot(snapshot => {
        const usersData = [];
        snapshot.forEach(doc => {
          const { name } = doc.data();
          usersData.push({ id: doc.id, name });
        });
        setUsers(usersData);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {users.map(user => (
        <View key={user.id} style={styles.userContainer}>
          {/* <Image
            source={{ uri: user.imageUrl }}
            style={styles.userImage}
          /> */}
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
});

export default Chat;
