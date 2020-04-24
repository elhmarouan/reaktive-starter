import React from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl } from 'react-native';
import { PostComponent } from '../../components/PostComponent';
import Fire from '../../utils/firestore';

const firebase = require("firebase");
require("firebase/firestore");

export class DashboardHomeTab extends React.Component {

  state = {
    refreshing: false,
    posts: []
  }

  componentDidMount() {
    this._loadPosts();
  }

  _loadPosts = () => {
    this.setState({refreshing: true});
    Fire.getPosts()
    .then(response => {
      this.setState({posts: Array.from(response)});
      this.setState({refreshing: false});
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={ this.state.posts }
          renderItem={({item}) =>
              <PostComponent 
                  post={item}
              /> 
          }
          keyExtractor= {item => item.id}
          showsVerticalScrollIndicator= {false} 
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this._loadPosts} />
          }
        />        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECF4'
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16
  }
});
