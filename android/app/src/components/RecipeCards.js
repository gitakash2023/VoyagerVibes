import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';

const RecipeCards = () => {
  const recipes = [
    {
      title: 'Recipe 1',
      image: 'https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=',
      price: 10.99,
      rating: 4.5,
    },
    {
        title: 'Recipe 1',
        image: 'https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=',
        price: 18.99,
        rating: 3.5,
      },
      {
        title: 'Recipe 1',
        image: 'https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=',
        price: 12.99,
        rating: 4.0,
      },
      {
        title: 'Recipe 1',
        image: 'https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=',
        price: 16.99,
        rating: 4.5,
      },
    
  ];

  const handleOrder = (recipe) => {
    const options = {
      description: `Order ${recipe.title}`,
     
      currency: 'INR',
      key: 'rzp_test_P9GGaAXRTQMmea',
      amount: recipe.price * 100, 
     
     
      theme: { color: '#3399cc' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle success (payment successful)
        Alert.alert('Success', `Payment successful! Order placed for ${recipe.title}`);
        navigation.navigate('UserHome');
      })
      .catch((error) => {
        // Handle failure (payment failed or user cancelled)
        Alert.alert('Error', 'Payment failed or cancelled');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {recipes.map((recipe, index) => (
          <Card key={index} style={styles.card}>
            <Card.Cover source={{ uri: recipe.image }} />
            <Card.Content>
              <Title>{recipe.title}</Title>
              <Paragraph>Price: ${recipe.price}</Paragraph>
              <Paragraph>Rating: {recipe.rating}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleOrder(recipe)}>Order</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginVertical: 10,
  },
});

export default RecipeCards;
