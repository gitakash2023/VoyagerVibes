import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './userBottomTabs/Home';
import Chat from './userBottomTabs/Chat';
import Cart from './userBottomTabs/Cart';
import Account from './userBottomTabs/Account';

const Tab = createBottomTabNavigator();

const UserHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = !focused
              ? require('../assests/home.png')
              : require('../assests/home_filled.png');
          } else if (route.name === 'Chat') {
            iconSource = !focused
              ? require('../assests/chat.png')
              : require('../assests/chat_filled.png');
          } else if (route.name === 'Account') {
            iconSource = !focused
              ? require('../assests/account.png')
              : require('../assests/account_filled.png');
          } else if (route.name === 'Cart') {
            iconSource = !focused
              ? require('../assests/cart.png')
              : require('../assests//cart_filled.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => {
          let label;
          if (route.name === 'Home') {
            label = 'Home';
          } else if (route.name === 'Chat') {
            label = 'Chat';
          } else if (route.name === 'Account') {
            label = 'Account';
          } else if (route.name === 'Cart') {
            label = 'Cart';
          }

          return (
            <Text
              style={{
                color: color,
                textAlign: 'center',
                fontSize: 11,
              }}>
              {label}
            </Text>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default UserHome;
