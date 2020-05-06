import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  Linking,
  AsyncStorage,
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome5';
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
import DeletePopup from '../../components/delete';

const image = {uri: 'https://reactjs.org/logo-og.png'};

const HomeScreen = ({navigation}) => {
  const [feeds, setFeeds] = useState([]);
  const [record, setRecord] = useState(false);
  const [canRecord, setCanRecord] = useState(false);
  const [login, setLogin] = useState(false);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostLiked, setMostLiked] = useState('createdAt');
  const [mostRecent, setMostRecent] = useState('likes');

  const [feedsListState, setFeedsListState] = useState({
    skip: 5,
    currentPage: 0,
    feedListData: [],
  });
  const recordOn = e => {
    setRecord(true);
  };
  const {userProfile, changeUserPermission, feedFilterState, canFeedReload} = useAppContextValue();
  const fetchAllFeeds = async () => {
    setFeedsListState(prevState => ({
      currentPage: 0,
      skip: 5,
      feedListData: [],
    }));
    setLoading(true);
    getFeeds(feedFilterState)
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
      let profilePic = await AsyncStorage.getItem('profilePic');
      let name = await AsyncStorage.getItem('name');
      let instaFollowers = await AsyncStorage.getItem('instaFollowers');
      let appFollowers = await AsyncStorage.getItem('appFollowers');
      let userId = await AsyncStorage.getItem('userId');
      await changeUserPermission(
        userType,
        profilePic,
        name,
        instaFollowers,
        appFollowers,
        userId
      );
    }
  };

  const loadFeeds = () => {
    fetchAllFeeds();
    canShowFeed();
  };

  useEffect(() => {
    loadFeeds();
  }, [mostRecent, mostLiked, canRecord, feedFilterState, canFeedReload]);

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <AppHeader
        navigation={navigation}
        loadFeeds={loadFeeds}
        showProfile
        canRecord
        setLogin={setLogin}
      />
      <View style={styles.feedContainer}>
        <View style={styles.cardCover}>
          {feeds && feeds.length > 0 ? (
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
          ) : (
            <View
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                alignSelf: 'center',
                justifySelf: 'center',
              }}>
              <Text style={styles.nofeed}>Oops... No audio feeds </Text>
              <Icon name="frown-open" type="font-awesome-5" size={52} color="#d63529" />
            </View>
          )}
        </View>
      </View>
      {canRecord && (
        <View style={styles.recording}>
          <Button
            type="solid"
            buttonStyle={styles.recordBtn}
            onPress={recordOn}
            icon={
              <Icon
                type="font-awesome-5"
                name="microphone-alt"
                size={50}
                color="#fff"
              />
            }
          />
        </View>
      )}
      <LoginPopUp setLogin={setLogin} login={login} loadFeeds={loadFeeds} />
      <UserDetail />
      {record && <PopUp setRecord={setRecord} records={record} />}
      <DeletePopup />
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
