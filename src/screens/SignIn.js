import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'galio-framework';

export class SignIn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h4>Sign In to your app</Text>
        <Input placeholder="Username" rounded />
        <Input placeholder="Password" rounded password viewPass />
        <Button round onPress={() => this.props.navigation.navigate('Dashboard')}>Sign In</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
