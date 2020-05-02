import React, { useEffect, useState } from 'react';
import {Text, View, Dimensions, Image, Linking} from 'react-native';
import axios from 'react-native-axios';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';

import AppHeader from '../../components/header';
import AppFilter from '../../components/sort';
import styles from './style.js';
import Feed from './Feed';
import { getFeeds } from '../../services/feeds';

const image = {uri: 'https://reactjs.org/logo-og.png'};

const HomeScreen = ({ navigation }) => {
  
  const [feeds, setFeeds] = useState([]);

  const fetchAllFeeds = () => {
    getFeeds()
    .then(({ data: { data: feedData } }) => {
      setFeeds(feedData);
    })
    .catch((response) => {
      console.error(response.body);
    });
  };

  useEffect(() => {
    fetchAllFeeds();
  }, []);

  return (<View style={styles.container}>
        <AppHeader navigation={navigation} />
        <ScrollView style={styles.feedContainer}>
          <View style={styles.cardCover}>
            <FlatList
              data={feeds}
              renderItem={({ item }) => <Feed feed={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
        <AppFilter />
      </View>);
};

export default HomeScreen;
