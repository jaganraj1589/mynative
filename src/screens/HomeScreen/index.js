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
import {getFeeds, getFeedByFetch} from '../../services/feeds';
import LoginPopUp from '../../components/loginpop';
import PopUp from '../../components/popup';
import Feedfilter from '../../components/filter';
import Loader from '../../utils/loader';
import {dynamicSort} from '../../utils/dynamicsort';

import UserDetail from '../../components/userDetail';
import {useAppContextValue} from '../../stores/appcontext';

const image = {uri: 'https://reactjs.org/logo-og.png'};

const HomeScreen = ({navigation}) => {
  const [feeds, setFeeds] = useState([]);
  const [record, setRecord] = useState(false);
  const [canRecord, setCanRecord] = useState(false);
  const [login, setLogin] = useState(false);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostLiked, setMostLiked] = useState('');
  const [mostRecent, setMostRecent] = useState('');

  const [feedsListState, setFeedsListState] = useState({
    skip: 5,
    currentPage: 0,
    feedListData: [],
  });
  const recordOn = e => {
    setRecord(true);
  };
  const {userProfile} = useAppContextValue();
  const fetchAllFeeds = async () => {
    setFeedsListState(prevState => ({
      currentPage: 0,
      skip: 5,
      feedListData: [],
    }));
    setLoading(true);
    getFeeds()
      .then(async ({data: {data: feedData}}) => {
        let sortedByMostLike = await feedData.sort(dynamicSort(mostLiked));
        let sortedDataByDate = await sortedByMostLike.sort(
          dynamicSort(mostRecent),
        );
        setFeeds(sortedDataByDate);
        setLoading(false);
        handleLoadMore();
      })
      .catch(response => {
        setLoading(false);
        console.error(response.body);
      });
  };
  handleLoadMore = async () => {
    //  console.log("handleLoadMore");
    // let data = [];
    // feeds.slice([feedsListState.currentPage], [feedsListState.skip]).map((item, i) => {
    //   data.push(item);
    // });
    // if (data.length > 0) {
    //   await setFeedsListState(prevState => ({
    //     ...prevState,
    //     currentPage: prevState.currentPage+5 ,
    //     skip: prevState.skip + 5,
    //     feedListData: [...prevState.feedListData, ...data]
    //   }));
    // }
  };
  const sortByMostRecent = async data => {
    setMostRecent(data);
  };
  const sortByMostLiked = async data => {
    setMostLiked(data);
  };

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
  }, [mostRecent, mostLiked]);

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <AppHeader
        navigation={navigation}
        loadFeeds={loadFeeds}
        showProfile
        setLogin={setLogin}
      />
      {/* <ScrollView style={styles.feedContainer}> */}
      <View style={styles.cardCover}>
        <FlatList
          data={feeds}
          // data={feedsListState.feedListData}
          keyExtractor={(item, index) => index}
          // keyExtractor={item => item.id}
          renderItem={({item}) => <Feed feed={item} />}
          initialNumToRender={5}
          onEndReachedThreshold={5}
          // onScroll={() => {
          //   this.handleLoadMore();
          // }}
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
      <LoginPopUp setLogin={setLogin} login={login} loadFeeds={loadFeeds} />
      <UserDetail />
      {record && <PopUp setRecord={setRecord} records={record} />}

      {filter ? <Feedfilter setFilter={setFilter} /> : null}
      <AppFilter
        setFilter={setFilter}
        sortByMostRecent={sortByMostRecent}
        navigation={navigation}
        sortByMostLiked={sortByMostLiked}
      />
    </View>
  );
};

export default HomeScreen;
