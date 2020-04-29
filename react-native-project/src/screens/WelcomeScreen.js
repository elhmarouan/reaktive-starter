import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'galio-framework';

export class WelcomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text h1>Welcome</Text>
        <View style={styles.signInBlock}>
            <Button round onPress={() => this.props.navigation.navigate('SignInRT')}>Sign In</Button>
            <Text style={styles.createAccountText} h5 onPress={() => this.props.navigation.navigate('SignUpRT')}>Create your account</Text>
        </View>
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
  signInBlock: {
      paddingTop: 20,
      alignItems: 'center'
  },
  createAccountText: {
      paddingTop: 10
  }
});
