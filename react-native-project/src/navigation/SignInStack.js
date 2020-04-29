import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardIndex } from '../screens/Dashboard/DashboardIndex';

const Stack = createStackNavigator();

export default function SignInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="DashboardIndexRT">
        <Stack.Screen name="DashboardIndexRT" component={DashboardIndex} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}