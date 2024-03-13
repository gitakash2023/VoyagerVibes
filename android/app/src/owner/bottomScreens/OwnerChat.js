import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const OwnerChat = () => {
  const [customers, setCustomers] = useState([]);
  const [uniqueCustomerNames, setUniqueCustomerNames] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersSnapshot = await firestore().collection('orders').get();
        const customersData = customersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const uniqueNames = Array.from(new Set(customers.map(customer => customer.currentUserName)));
    setUniqueCustomerNames(uniqueNames);
  }, [customers]);

  const handleChat = (customerId) => {
    console.log("Customer ID:", customerId);
    navigation.navigate('ChatScreen', { customerId });
  };
  

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleChat(item.id)}>
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
      data={uniqueCustomerNames}
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

export default OwnerChat;
