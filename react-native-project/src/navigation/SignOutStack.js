import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function SignOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="WelcomeRT">
        <Stack.Screen name="WelcomeRT" component={WelcomeScreen} />
        <Stack.Screen name="SignInRT" component={SignInScreen} />
        <Stack.Screen name="SignUpRT" component={SignUpScreen} />
        <Stack.Screen name="ForgotPasswordRT" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}