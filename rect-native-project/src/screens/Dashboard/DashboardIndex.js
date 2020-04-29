import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DashboardHomeTab } from './DashboardHomeTab';
import { DashboardProfileTab } from './DashboardProfileTab';
import { DashboardPostTab } from './DashboardPostTab';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="DashboardHomeRT"
        component={DashboardHomeTab}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="DashboardPostRT"
        component={DashboardPostTab}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="DashboardProfileRT"
        component={DashboardProfileTab}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export class DashboardIndex extends React.Component {

    render() {
      return (
        <MyTabs />
      );
    }
}