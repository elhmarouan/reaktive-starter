import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../utils/firebase.js';

export class LoadingScreen extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('DashboardRT');
            } else {
                this.props.navigation.navigate('HomeRT');
            }
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});