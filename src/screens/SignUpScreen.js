import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text } from 'galio-framework';
import firebase from '../utils/firebase.js';
import { emailValidator, passwordValidator, passwordsMatchValidator, nameValidator } from '../utils/validators.js';

export class SignUpScreen extends React.Component {

  state = {
    name: {
      value: '',
      error: ''
    },
    email: {
      value: '',
      error: ''
    },
    password: {
      value: '',
      error: ''
    },
    confirmPassword: {
      value: '',
      error: ''
    }
  }

  onSignUpPressed = () => {
    const nameError = nameValidator(this.state.name.value);
    const emailError = emailValidator(this.state.email.value);
    const passwordError = passwordValidator(this.state.password.value);
    const confirmPasswordError = passwordValidator(this.state.confirmPassword.value);
    const passwordsMatchError = passwordsMatchValidator(this.state.password.value, this.state.confirmPassword.value);

    if (nameError || emailError || passwordError || confirmPasswordError || passwordsMatchError ) {
      this.setState({
        name: {
          value: this.state.name.value,
          error: nameError
        },
        email: {
          value: this.state.email.value,
          error: emailError
        },
        password: {
          value: this.state.password.value,
          error: passwordError || passwordsMatchError
        },
        confirmPassword: {
          value: this.state.confirmPassword.value,
          error: confirmPasswordError || passwordsMatchError
        }
      });
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(this.state.email.value, this.state.password.value)
      .then(userCredentials => { 
        return userCredentials.user.updateProfile({
          displayName: this.state.name.value
        });
      }, (error) => {
        Alert.alert(error.message); 
      });;
  }

    render() {
      return (
          <View style={styles.container}>
            <Text h4>Create your account</Text>
            <View style={styles.signUpBlock}>
              <Input 
                rounded
                placeholder="Full name"
                value={this.state.name.value}
                onChangeText={text => this.setState({ name: {value: text, error: ''}})}
                style={ { borderColor: !!this.state.name.error ? 'red' : '' } }  
              />
              <Text style={styles.errorMessage} color="red">{this.state.name.error}</Text>
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
              <Input
              rounded
              placeholder="Confirm password"
              password
              viewPass
              value={this.state.confirmPassword.value}
              onChangeText={text => this.setState({ confirmPassword: {value: text, error: ''}})}
              style={ { borderColor: !!this.state.confirmPassword.error ? 'red' : '' } }  
              />
              <Text style={styles.errorMessage} color="red">{this.state.confirmPassword.error}</Text>
            </View>
          <Button round onPress={() => this.onSignUpPressed()}>Sign In</Button>
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
    signUpBlock: {
      paddingTop: 20,
      paddingBottom: 20,
      width: '80%'
    }
  });