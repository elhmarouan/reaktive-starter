import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text } from 'galio-framework';
import firebase from '../utils/firebase.js';
import { emailValidator, passwordValidator } from '../utils/validators.js';

export class SignInScreen extends React.Component {

  state = {
    email: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    }
  }

  onLoginPressed = () => {
    const emailError = emailValidator(this.state.email.value);
    const passwordError = passwordValidator(this.state.password.value);

    if (emailError || passwordError) {
      this.setState({
        email: {
          value: this.state.email.value,
          error: emailError
        },
        password: {
          value: this.state.password.value,
          error: passwordError
        }
      });
      return;
    }

    firebase.auth().signInWithEmailAndPassword(this.state.email.value, this.state.password.value)
    .then(() => {
      
    })
    .catch(error => Alert.alert(error.message));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4>Sign In to your app</Text>
        <View style={styles.signInBlock}>
          <Input 
            rounded
            placeholder="Email"
            value={this.state.email.value}
            onChangeText={text => this.setState({ email: {value: text, error: ''}})}
            style={ { borderColor: !!this.state.email.error ? 'red' : '' } }  
          />
          <Text style={styles.errorMessage} color="red">{this.state.email.error}</Text>
          <Input
            rounded
            placeholder="Password"
            password
            viewPass
            value={this.state.password.value}
            onChangeText={text => this.setState({ password: {value: text, error: ''}})}
            style={ { borderColor: !!this.state.password.error ? 'red' : '' } }  
            />
            <Text style={styles.errorMessage} color="red">{this.state.password.error}</Text>
        </View>
        <Button round onPress={() => this.onLoginPressed()}>Sign In</Button>
        <Text style={styles.forgotPasswordLink} muted onPress={() => this.props.navigation.navigate('ForgotPasswordRT')}>Forgot Password ?</Text>
        {/* <Text>
          Don't have an account?
          <Text style={styles.underline} onPress={() => this.props.navigation.navigate('SignUpRT')}> Sign Up
          </Text>
        </Text> */}
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
  signInBlock: {
    paddingTop: 20,
    paddingBottom: 20,
    width: '80%'
  },
  forgotPasswordLink: {
    paddingTop: 15
  },
  underline: {
    textDecorationLine: 'underline'
  }
});
