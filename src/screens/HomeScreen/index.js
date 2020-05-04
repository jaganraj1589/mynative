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
import Loader from '../../utils/loader';

const image = {uri: 'https://reactjs.org/logo-og.png'};

const HomeScreen = ({navigation}) => {
  const [feeds, setFeeds] = useState([]);
  const [record, setRecord] = useState(false);
  const [canRecord, setCanRecord] = useState(false);
  const [login, setLogin] = useState(false);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedsListState, setFeedsListState] = useState({
    skip:5,
    currentPage: 0,
    feedListData: []
  });
  const recordOn = e => {
    setRecord(true);
  };

  const fetchAllFeeds = () => {
    setLoading(true);
    getFeeds()
      .then(({data: {data: feedData}}) => {
        setFeeds(feedData);
        setLoading(false);
        handleLoadMore();
      })
    .catch(response => {
      setLoading(false);
      console.error(response.body);
    });
  };
  handleLoadMore = async () => {
    
    let data = [];
    feeds.slice([feedsListState.currentPage], [feedsListState.skip]).map((item, i) => {
      data.push(item);
    });
    if (data.length > 0) {
      setLoading(true);
      await setFeedsListState(prevState => ({
        ...prevState,
        currentPage: prevState.currentPage+5 ,
        skip: prevState.skip + 5,
        feedListData: [...prevState.feedListData, ...data]
      }));
      setTimeout(() => {
          setLoading(false);
      }, 500);
    }
  }

  const canShowFeed = async () => {
    const userType = await AsyncStorage.getItem('userType');
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
     <Loader
          loading={loading} />
      <AppHeader
        navigation={navigation}
        loadFeeds={loadFeeds}
        showProfile
        setLogin={setLogin}
      />
      {/* <ScrollView style={styles.feedContainer}> */}
        <View style={styles.cardCover}>
          <FlatList
            //data={feeds}
            data={feedsListState.feedListData}
           // keyExtractor={(item, index) => index.toString()}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Feed feed={item} />}
            initialNumToRender={5}
            onEndReachedThreshold={5}
            onScroll={() => {
              this.handleLoadMore();
            }}
          />
        </View>
      {/* </ScrollView> */}
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
