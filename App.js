import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './routes.js';

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}
