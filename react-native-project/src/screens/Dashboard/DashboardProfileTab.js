import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, Button } from 'galio-framework';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserPermissions from '../../utils/UserPermissions';
import * as ImagePicker from 'expo-image-picker';
import Fire from '../../utils/Fire';

export class DashboardProfileTab extends React.Component {

  state = {
    address: {},
    user: {
      email: '',
      name: '',
      avatar: null
    }
  }

  unsubscribe = null;

  componentDidMount(){
    this.loadCurrentUser();
    // this._getLocation();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loadCurrentUser = () => {
    const userUid = Fire.uid;

    this.unsubscribe = Fire.firestore
      .collection("users")
      .doc(userUid)
      .onSnapshot(doc => {
        this.setState({user: doc.data()});
        console.log(JSON.stringify(this.state.user));
      })
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
      UserPermissions.getPositionPermission();
      let location = await Location.getCurrentPositionAsync({});
      this._attemptReverseGeocodeAsync(location);
    })();
  };

  onSavePressed = () => {
    Fire.updateUser(this.state.user);
  }

  onSignoutPressed = () => {
    firebase.auth().signOut();
  }

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({user: {...this.state.user, avatar: result.uri} })
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarBlock}>
          <Text h4>Welcome</Text>
          <Text h4>{this.state.user.name}</Text>
          <Text style={{paddingTop: 20}}>Your email address is: {this.state.user.email}</Text>
          <Text style={{paddingTop: 20}}>Your location is: {JSON.stringify(this.state.address)}</Text>
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
            <Image source={{uri: this.state.user.avatar}} style={styles.avatar} />
            <MaterialCommunityIcons 
              name="plus"
              color="#FFF"
              size={40} />
          </TouchableOpacity>
        </View>
        <Button style={styles.updateButton} color="success" round onPress={() => this.onSavePressed()}>Update</Button>
        <Button style={styles.signOutButton} color="error" round onPress={() => this.onSignoutPressed()}>Sign Out</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    avatarBlock: {
      position: "absolute",
      top: 64,
      alignItems: "center",
      width: "100%"
    },
    avatarPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "#E1E2E6",
      marginTop: 48,
      justifyContent: "center",
      alignItems: "center"
    },
    avatar: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50
    },
    updateButton: {
      position: "absolute",
      bottom: 60
    },
    signOutButton: {
      position: "absolute",
      bottom: 15
    }
});
