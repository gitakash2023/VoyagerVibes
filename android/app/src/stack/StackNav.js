import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../splash/Splash';
import Selection from '../selection/Selection';
import UserSignup from '../user/userAuth/UserSignup';
import UserProfile from '../user/userProfile/UserProfile';
import UserHome from '../user/UserHome';
import RecipeCards from '../components/RecipeCards';
import ChatScreen from './stackScreens/ChatScreen';




const Stack = createStackNavigator();
const StackNav = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Selection" component={Selection} />
      <Stack.Screen name="UserSignup" component={UserSignup} />
      {/* <Stack.Screen name="UserLogin" component={UserLogin} /> */}
      <Stack.Screen name="UserProfile" component={UserProfile} /> 
      <Stack.Screen name="UserHome" component={UserHome} /> 
      <Stack.Screen name="RecipeCards" component={RecipeCards} /> 
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNav