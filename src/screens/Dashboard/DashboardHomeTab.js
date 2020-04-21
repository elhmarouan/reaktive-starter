import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'galio-framework';
import firebase from '../../utils/firebase';
import * as Location from 'expo-location';

export class DashboardHomeTab extends React.Component {

  state = {
    address: {},
    currentUser: {
      email: '',
      displayName: ''
    }
  }

  componentDidMount(){
    const {email , displayName} = firebase.auth().currentUser;
    this.setState({
      currentUser: {email, displayName}
    });
    this._getLocation()
  }

  _attemptReverseGeocodeAsync = async (location) => {
    try {
      const coords = {latitude:location.coords.latitude, longitude:location.coords.longitude};
      let result = await Location.reverseGeocodeAsync(coords);
      console.log(JSON.stringify(result));
      let address = `${result[0].name} ${result[0].street}, ${result[0].postalCode} ${result[0].city}, ${result[0].region}, ${result[0].country}`;
      this.setState({
        address
      });
    } catch (e) {
      return e;
    }
  };

  _getLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('PERMISSION NOT GRANTED');
      }
      let location = await Location.getCurrentPositionAsync({});
      this._attemptReverseGeocodeAsync(location);
    })();
  };

  render() {
    return (
      <View style={styles.container}>
        { !!this.state.currentUser.email && (
          <View style={{width: '98%'}}>
            <Text h4>Welcome {this.state.currentUser.displayName}</Text>
            <Text style={{paddingTop: 20}}>Your email address is: {this.state.currentUser.email}</Text>
            <Text style={{paddingTop: 20}}>Your location is: {JSON.stringify(this.state.address)}</Text>
          </View>
        )}
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
  }
});
