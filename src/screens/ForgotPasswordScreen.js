import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text } from 'galio-framework';
import firebase from '../utils/firebase';
import { emailValidator } from '../utils/validators';

export class ForgotPasswordScreen extends React.Component {

  state = {
    email: {
      value: '',
      error: ''
    }
  }

  onResetPasswordPress = () => {
    const emailError = emailValidator(this.state.email.value);

    if (emailError) {
      this.setState({
        email: {
          value: this.state.email.value,
          error: emailError
        }
      });
      return;
    }

    Alert.alert('Password  reset !');
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4>Forgot your password?</Text>
        <Text style={styles.confirmResetText} muted>Confirm your email and we'll send the instructions.</Text>
        <View style={styles.signInBlock}>
          <Input 
            rounded
            placeholder="Email"
            value={this.state.email.value}
            onChangeText={text => this.setState({ email: {value: text, error: ''}})}
            style={ { borderColor: !!this.state.email.error ? 'red' : '' } }  
          />
          <Text style={styles.errorMessage} color="red">{this.state.email.error}</Text>
        </View>
        <Button round onPress={() => this.onResetPasswordPress()}>Reset Password</Button>
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
  errorMessage: {
    textAlign: 'left'
  },
  confirmResetText: {
    paddingTop: 20
  },
  signInBlock: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '80%'
  }
});
