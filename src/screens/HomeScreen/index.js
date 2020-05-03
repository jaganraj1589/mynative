import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  Linking,
  AsyncStorage,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
import {getFeeds} from '../../services/feeds';
import LoginPopUp from '../../components/loginpop';
import PopUp from '../../components/popup';
import Feedfilter from '../../components/filter';

const image = {uri: 'https://reactjs.org/logo-og.png'};

const HomeScreen = ({navigation}) => {
  const [feeds, setFeeds] = useState([]);
  const [record, setRecord] = useState(false);
  const [canRecord, setCanRecord] = useState(false);
  const [login, setLogin] = useState(false);
  const [filter, setFilter] = useState(false);
  const recordOn = e => {
    setRecord(true);
  };

  const fetchAllFeeds = () => {
    getFeeds()
      .then(({data: {data: feedData}}) => {
        setFeeds(feedData);
      })
      .catch(response => {
        console.error(response.body);
      });
  };

  const canShowFeed = async () => {
    const userType = await AsyncStorage.getItem('userType');
    console.info(userType);
    if (userType === 'speaker') {
      setCanRecord(true);
    }
  };

  const loadFeeds = () => {
    fetchAllFeeds();
    canShowFeed();
  };

  useEffect(() => {
    loadFeeds();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader
        navigation={navigation}
        loadFeeds={loadFeeds}
        showProfile
        setLogin={setLogin}
      />
      <ScrollView style={styles.feedContainer}>
        <View style={styles.cardCover}>
          <FlatList
            data={feeds}
            renderItem={({item}) => <Feed feed={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      {canRecord && (
        <View style={styles.recording}>
          <Button
            type="solid"
            buttonStyle={styles.recordBtn}
            onPress={recordOn}
            icon={<Icon name="microphone-alt" size={50} color="#fff" />}
          />
        </View>
      )}
      {login && <LoginPopUp setLogin={setLogin} loadFeeds={loadFeeds} />}
      {record && <PopUp setRecord={setRecord} />}
      {filter ? <Feedfilter setFilter={setFilter} /> : null}
      <AppFilter setFilter={setFilter} />
    </View>
  );
};

export default HomeScreen;
