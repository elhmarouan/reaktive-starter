import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from './src/screens/SignInScreen.js';
import { SignUpScreen } from './src/screens/SignUpScreen.js';
import { HomeScreen } from './src/screens/HomeScreen.js';
import { DashboardScreen } from './src/screens/DashboardScreen.js';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen.js';
import { LoadingScreen } from './src/screens/LoadingScreen.js';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="LoadingRT" headerMode="none">
      <Stack.Screen name="SignInRT" component={SignInScreen} />
      <Stack.Screen name="SignUpRT" component={SignUpScreen} />
      <Stack.Screen name="HomeRT" component={HomeScreen} />
      <Stack.Screen name="DashboardRT" component={DashboardScreen} />
      <Stack.Screen name="ForgotPasswordRT" component={ForgotPasswordScreen} />
      <Stack.Screen name="LoadingRT" component={LoadingScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;