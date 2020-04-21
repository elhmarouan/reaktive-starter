import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'galio-framework';

export class DashboardPublishTab extends React.Component {

  render() {
    return (
      <View style={styles.container}>
          <Text>Here you can publish things</Text>
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
