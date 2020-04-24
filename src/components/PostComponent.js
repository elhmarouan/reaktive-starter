import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

export class PostComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.feedItem}>
                <Image source={require("../assets/images/anonymous-avatar-icon.jpg")} style={styles.avatar} />
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>{this.props.post.username}</Text>
                            <Text style={styles.timestamp}>{moment(this.props.post.timestamp).fromNow()}</Text>
                        </View>

                        <MaterialCommunityIcons name="dots-horizontal" color="#73788B" size={24} />
                    </View>

                    <Text style={styles.post}>{this.props.post.text}</Text>

                    <Image source={{uri: this.props.post.image}} style={styles.postImage} resizeMode="cover" />

                    <View style={{flexDirection: "row"}}>
                        <MaterialCommunityIcons name="heart-outline" color="#73788B" size={24} style={{marginRight: 16}} />
                        <MaterialCommunityIcons name="forum" color="#73788B" size={24} />
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65",
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
  });