import React, {useState} from 'react';
// import styles from './style.js';
import {Text, View, StyleSheet, Dimensions, Image, Linking} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AppHeader from '../../components/header';
import PlayBtn from '../../components/playbtn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import AppFilter from '../../components/sort';
import PopUp from '../../components/popup';
import LoginPopUp from '../../components/loginpop';

const HomeScreen = () => {
  const [record, setRecord] = useState(null);
  const [login, setLogin] = useState(null);
  const recordOn = e => {
    setRecord(true);
  };

  return (
    <>
      <View style={styles.container}>
        <AppHeader setLogin={setLogin} />
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
        <View style={styles.recording}>
          <Button
            type="solid"
            buttonStyle={styles.recordBtn}
            onPress={recordOn}
            icon={<Icon name="microphone-alt" size={50} color="#fff" />}
          />
        </View>
        {login ? <LoginPopUp setLogin={setLogin}/> : null}
        {record ? <PopUp setRecord={setRecord} /> : null}
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
    fontFamily: 'Roboto-Bold',
  },
  recordBtn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#eb3434',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 5,
  },
  recording: {
    width: 100,
    height: 100,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 10,
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
    width: 40,
    height: 40,
    borderRadius: 40,
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
    padding: 3,
    color: '#fff',
    borderRadius: 5,
    width: 100,
    marginTop: 5,
    fontFamily: 'Roboto',
    fontSize: 12,
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
