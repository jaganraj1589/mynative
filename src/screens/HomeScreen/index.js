import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions, Image, Linking} from 'react-native';
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

const image = {uri: 'https://reactjs.org/logo-og.png'};

const HomeScreen = ({navigation}) => {
  const [feeds, setFeeds] = useState([]);
  const [record, setRecord] = useState(null);
  const [login, setLogin] = useState(null);
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

  useEffect(() => {
    fetchAllFeeds();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} fetchAllFeeds={fetchAllFeeds} showProfile setLogin={setLogin} />
      <ScrollView style={styles.feedContainer}>
        <View style={styles.cardCover}>
          <FlatList
            data={feeds}
            renderItem={({item}) => <Feed feed={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      <View style={styles.recording}>
        <Button
          type="solid"
          buttonStyle={styles.recordBtn}
          onPress={recordOn}
          icon={<Icon name="microphone-alt" size={50} color="#fff" />}
        />
      </View>
      {login ? <LoginPopUp setLogin={setLogin} /> : null}
      {record ? <PopUp setRecord={setRecord} /> : null}
      <AppFilter />
    </View>
  );
};

export default HomeScreen;
