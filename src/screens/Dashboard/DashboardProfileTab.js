import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'galio-framework';
import firebase from '../../utils/firebase';

export class DashboardProfileTab extends React.Component {

  onSignoutPressed = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Here you can update your profile</Text>
          <Button style={styles.signOutButton} color="error" round onPress={() => this.onSignoutPressed()}>Sign Out</Button>
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
    signOutButton: {
      position: 'absolute',
      bottom: 15
    }
});
