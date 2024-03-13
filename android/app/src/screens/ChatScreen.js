import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const currentUser = auth().currentUser;
  const { ownerId } = route.params; // Check if ownerId is correctly accessed from route.params
  console.log('Owner ID:', ownerId); // Debugging to check if ownerId is correctly received

  useEffect(() => {
    console.log('Current User ID:', currentUser.uid);

    // Ensure ownerId is not undefined before proceeding
    if (ownerId) {
      const chatId = [currentUser.uid, ownerId].sort().join('_');

      const unsubscribe = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const messagesData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              _id: doc.id,
              text: data.text,
              createdAt: data.timestamp ? data.timestamp.toDate() : new Date(),
              user: {
                _id: data.user._id,
              },
            };
          });
          console.log('Messages:', messagesData);
          setMessages(messagesData);
        });

      return () => unsubscribe();
    }
  }, [ownerId, currentUser]);

  const handleSendMessage = async (newMessages = []) => {
    const newMessage = newMessages[0];
    if (ownerId) {
      const chatId = [currentUser.uid, ownerId].sort().join('_');
      try {
        await firestore()
          .collection('chats')
          .doc(chatId)
          .collection('messages')
          .add({
            user: {
              _id: currentUser.uid,
            },
            text: newMessage.text,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSendMessage(newMessages)}
        user={{
          _id: currentUser.uid,
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default ChatScreen;
