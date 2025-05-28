import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header} from '../../Header/ui/Header';
import {TweetList} from '../../TweetList/ui/TweetList';

function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <TweetList />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
