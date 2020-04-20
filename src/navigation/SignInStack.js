import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '../screens/DashboardScreen';

const Stack = createStackNavigator();

export default function SignOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="DashboardRT">
        <Stack.Screen name="DashboardRT" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}