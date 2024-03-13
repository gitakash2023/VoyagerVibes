import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [owners, setOwners] = useState([]);
  const [uniqueOwnerNames, setUniqueOwnerNames] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const ownersSnapshot = await firestore().collection('orders').where('currentUserId', '==', currentUser.uid).get();
          const ownersData = ownersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setOwners(ownersData);
        }
      } catch (error) {
        console.error('Error fetching owners:', error);
      }
    };

    fetchOwners();
  }, []);

  useEffect(() => {
    const uniqueNames = Array.from(new Set(owners.map(owner => owner.owner)));
    setUniqueOwnerNames(uniqueNames);
  }, [owners]);

  const handleChat = (ownerId) => {
    navigation.navigate('ChatScreen', { ownerId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleChat(item.ownerId)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg' }} style={styles.image} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{item}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={uniqueOwnerNames}
      renderItem={renderItem}
      keyExtractor={item => item}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Chat;
