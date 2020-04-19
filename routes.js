import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from './src/screens/SignIn.js';
import { SignUp } from './src/screens/SignUp.js';
import { HomeScreen } from './src/screens/HomeScreen.js';
import { Dashboard } from './src/screens/Dashboard.js';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default MyStack;

// const AppNavigator = createStackNavigator(
//     {
//         SignIn: {
//             screen: SignIn,
//         },
//         SignUp: {
//             screen: SignUp
//         },
//         HomeScreen: {
//             screen: HomeScreen
//         }
//     }, 
//     {
//         initialRouteName: 'HomeScreen',
//         headerMode: 'none',
//     }
//     );

// export default createAppContainer(AppNavigator);