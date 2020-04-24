import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from '../../utils/firestore';
import * as ImagePicker from 'expo-image-picker';

const firebase = require("firebase");
require("firebase/firestore");

export class DashboardPostTab extends React.Component {

  state = {
    text: "",
    image: null
  }

  componentDidMount() {
    this.getPhotoPermission();
  }

  handlePost = () => {
    Fire.addPost({text: this.state.text.trim(), localUri: this.state.image})
    .then(ref => {
      this.setState({text: "", image: null})
      Alert.alert('Posted !');
    })
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  getPhotoPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('PHOTO PERMISSION NOT GRANTED');
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="arrow-left" color="#D8D9DB" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={{ fontWeight: "500"}}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Image source={require("../../assets/images/anonymous-avatar-icon.jpg")} style={styles.avatar}></Image>
          <TextInput 
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{flex: 1}}
            placeholder="Want to share something?"
            onChangeText={text => this.setState({text: text})}
            value={this.state.text}>
          </TextInput>
        </View>
        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <MaterialCommunityIcons name="camera" color="#D8D9DB" size={32} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={{uri: this.state.image}} style={styles.image}></Image>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 32,
      paddingVertical: 32,
      borderBottomWidth: 1,
      borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
      margin: 32,
      flexDirection: "row"
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 16
    },
    photo: {
      alignItems: "flex-end",
      marginHorizontal: 32
    },
    imageContainer: {
      marginHorizontal: 32,
      marginTop: 32,
      height: 150
    },
    image: {
      width: '100%',
      height: '100%'
    }
});
