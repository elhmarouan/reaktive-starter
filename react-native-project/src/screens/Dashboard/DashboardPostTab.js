import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserPermissions from '../../utils/UserPermissions';
import Fire from '../../utils/Fire';
import * as ImagePicker from 'expo-image-picker';

export class DashboardPostTab extends React.Component {

  state = {
    text: "",
    image: null,
    avatar: null
  }


  componentDidMount() {
    this.setState({avatar: Fire.userPhotoUrl});
  }

  handlePost = () => {
    Fire.addPost({text: this.state.text.trim(), localUri: this.state.image})
    .then(ref => {
      this.setState({text: "", image: null})
      Alert.alert('Posted !');
    })
  }

  pickImage = async () => {
    UserPermissions.getCameraRollPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  takeImage = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      this.setState({image: result.uri});
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
          <Image
                    style={styles.avatar}
                    source={!!this.state.avatar
                        ? {uri: this.state.avatar}                      
                        : require("../../assets/images/anonymous-avatar-icon.jpg")}
          />   
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
        <View style={styles.addPhotoContainer}>
          <TouchableOpacity onPress={this.pickImage} style={{marginLeft: 10}}>
            <MaterialCommunityIcons name="image-plus" color="#D8D9DB" size={32} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takeImage}>
            <MaterialCommunityIcons name="camera" color="#D8D9DB" size={32} />
          </TouchableOpacity>
        </View>
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
    addPhotoContainer: {
      flexDirection: "row-reverse",
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
