import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function SignOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="HomeRT">
        <Stack.Screen name="HomeRT" component={HomeScreen} />
        <Stack.Screen name="SignInRT" component={SignInScreen} />
        <Stack.Screen name="SignUpRT" component={SignUpScreen} />
        <Stack.Screen name="ForgotPasswordRT" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}