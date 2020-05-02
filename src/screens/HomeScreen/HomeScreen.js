import React from 'react';
// import styles from './style.js';
import {Text, View, StyleSheet, Dimensions, Image, Linking} from 'react-native';
import axios from 'react-native-axios';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import AppHeader from '../../components/header';
import PlayBtn from '../../components/playbtn';
const {height, width} = Dimensions.get('window');
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import AppFilter from '../../components/sort';

const image = {uri: 'https://reactjs.org/logo-og.png'};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: 'jagan1589',
    userImage: 'https://reactjs.org/logo-og.png',
    postedtime: '8 mins ago',
    followed: true,
    followers: 18,
    linktext: 'google',
    link: 'https://reactjs.org/logo-og.png',
    liked: true,
    likes: 20,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: 'jagan1589',
    userImage: 'https://reactjs.org/logo-og.png',
    postedtime: '8 mins ago',
    followed: true,
    followers: 18,
    linktext: 'google',
    link: 'https://reactjs.org/logo-og.png',
    liked: true,
    likes: 20,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: 'jagan1589',
    userImage: 'https://reactjs.org/logo-og.png',
    postedtime: '8 mins ago',
    followed: true,
    followers: 18,
    linktext: 'google',
    link: 'https://reactjs.org/logo-og.png',
    liked: true,
    likes: 20,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: 'jagan1589',
    userImage: 'https://reactjs.org/logo-og.png',
    postedtime: '8 mins ago',
    followed: true,
    followers: 18,
    linktext: 'google',
    link: 'https://reactjs.org/logo-og.png',
    liked: true,
    likes: 20,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: 'jagan1589',
    userImage: 'https://reactjs.org/logo-og.png',
    postedtime: '8 mins ago',
    followed: true,
    followers: 18,
    linktext: 'google',
    link: 'https://reactjs.org/logo-og.png',
    liked: true,
    likes: 20,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: 'jagan1589',
    userImage: 'https://reactjs.org/logo-og.png',
    postedtime: '8 mins ago',
    followed: true,
    followers: 18,
    linktext: 'google',
    link: 'https://reactjs.org/logo-og.png',
    liked: true,
    likes: 20,
  },
];

const HomeScreen = () => {
  // axios
  //   .post(
  //     'https://chit-chat-audio-micro-blogging-staging.eu-staging.kacdn.net/api/feed/list',
  //   )
  //   .then(function(response) {
  //     alert(response);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
  return (
    <>
      <View style={styles.container}>
        <AppHeader />
        <ScrollView style={styles.feedContainer}>
          <View style={styles.cardCover}>
            <View style={styles.card}>
              <View style={styles.topRow}>
                <View style={styles.userNameBlock}>
                  <Image
                    style={styles.userImage}
                    source={{
                      uri: 'https://reactjs.org/logo-og.png',
                    }}
                  />
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Jags@1426
                  </Text>
                </View>
                <View style={styles.followBlock}>
                  <Text style={{textAlign: 'center', width: 100, fontSize: 14}}>
                    10 Followers
                  </Text>
                  <TouchableOpacity style={styles.followBtn}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.detail}>
                <View style={styles.postDetail}>
                  <Text style={{color: '#8c8c8c'}}>8 mins ago</Text>
                  <Text numberOfLines={1}>Motivations Morning</Text>
                  <Text
                    numberOfLines={1}
                    style={{color: 'blue'}}
                    onPress={() => Linking.openURL('http://google.com')}>
                    Google
                  </Text>
                </View>

                <PlayBtn />

                <View style={styles.likes}>
                  <Text>20 likes</Text>
                  <FontAwesomeIcon icon={faHeart} color={'#eb3434'} />
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.topRow}>
                <View style={styles.userNameBlock}>
                  <Image
                    style={styles.userImage}
                    source={{
                      uri: 'https://reactjs.org/logo-og.png',
                    }}
                  />
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Jags@1426
                  </Text>
                </View>
                <View style={styles.followBlock}>
                  <Text style={{textAlign: 'center', width: 100, fontSize: 14}}>
                    10 Followers
                  </Text>
                  <TouchableOpacity style={styles.followBtn}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.detail}>
                <View style={styles.postDetail}>
                  <Text style={{color: '#8c8c8c'}}>8 mins ago</Text>
                  <Text numberOfLines={1}>Motivations Morning</Text>
                  <Text
                    numberOfLines={1}
                    style={{color: 'blue'}}
                    onPress={() => Linking.openURL('http://google.com')}>
                    Google
                  </Text>
                </View>

                <PlayBtn />

                <View style={styles.likes}>
                  <Text>20 likes</Text>
                  <FontAwesomeIcon icon={faHeart} color={'#eb3434'} />
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.topRow}>
                <View style={styles.userNameBlock}>
                  <Image
                    style={styles.userImage}
                    source={{
                      uri: 'https://reactjs.org/logo-og.png',
                    }}
                  />
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Jags@1426
                  </Text>
                </View>
                <View style={styles.followBlock}>
                  <Text style={{textAlign: 'center', width: 100, fontSize: 14}}>
                    10 Followers
                  </Text>
                  <TouchableOpacity style={styles.followBtn}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.detail}>
                <View style={styles.postDetail}>
                  <Text style={{color: '#8c8c8c'}}>8 mins ago</Text>
                  <Text numberOfLines={1}>Motivations Morning</Text>
                  <Text
                    numberOfLines={1}
                    style={{color: 'blue'}}
                    onPress={() => Linking.openURL('http://google.com')}>
                    Google
                  </Text>
                </View>

                <PlayBtn />

                <View style={styles.likes}>
                  <Text>20 likes</Text>
                  <FontAwesomeIcon icon={faHeart} color={'#eb3434'} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <AppFilter />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  rowFlex: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  cardCover: {
    display: 'flex',
    flex: 1,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flex: 1,
  },
  feedContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  topRow: {
    justifyContent: 'space-around',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  userNameBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'flex-start',
  },
  followBtn: {
    backgroundColor: '#fb9f1d',
    padding: 5,
    color: '#fff',
    borderRadius: 5,
    width: 100,
  },
  followBlock: {
    width: '40%',
    alignItems: 'flex-end',
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  postDetail: {
    width: '30%',
  },
  PlayBtns: {
    width: '100%',
    height: '100%',
  },
  likes: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen;
