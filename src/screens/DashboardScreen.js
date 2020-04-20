import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'galio-framework';
import firebase from '../utils/firebase';

export class DashboardScreen extends React.Component {

  state = {
    currentUser: {
      email: '',
      displayName: ''
    }
  }

  onSignoutPressed = () => {
    firebase.auth().signOut();
  }

  componentDidMount(){
    const {email , displayName} = firebase.auth().currentUser;
    this.setState({
      currentUser: {email, displayName}
    });
  }

  render() {
    return (
      <View style={styles.container}>
        { !!this.state.currentUser.email && (
          <View>
            <Text>Welcome {this.state.currentUser.displayName}</Text>
            <Text>Your email address is: {this.state.currentUser.email}</Text>
          </View>
        )}
        <Button color="error" round onPress={() => this.onSignoutPressed()}>Sign Out</Button>
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
