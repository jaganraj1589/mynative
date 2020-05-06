import React,  {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, Image, AsyncStorage} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPodcast} from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Avatar} from 'react-native-elements';
import {useAppContextValue} from '../stores/appcontext';

const AppHeader = ({navigation, loadFeeds, showProfile, canRecord, setLogin}) => {
  const toProfile = () => {
    navigation.navigate('profile');
  };

  const {userDetails, userDetailsState} = useAppContextValue();
  const onUserClick = () => {
    console.log("onUserClick")
    setLogin(true)
  }
  return (
    <LinearGradient
      style={styles.header}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#fe3262', '#fb4c57', '#fb6e5c']}>
      <View style={styles.logo}>
        <FontAwesomeIcon
          icon={faPodcast}
          onPress={e => loadFeeds()}
          color={'#feb44b'}
          size={40}
        />
        <Text style={styles.logoText}>BADS</Text>
      </View>
 
      {userDetailsState.loginUserType== "speaker" ? (
        <Avatar
          rounded
          containerStyle={styles.avatar}
          size="medium"
          onPress={userDetails}
          source={{
            uri:userDetailsState.userProfilePic,
          }}
        />
      ) : (
        <View>
          <Button
            type="solid"
            buttonStyle={styles.loginBtn}
            onPress={onUserClick}
            icon={<Icon name="user" size={30} color="#fff" />}
          />
        </View>
      )}
    </LinearGradient>
  );
};

AppHeader.defaultProps = {
  showProfile: false,
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fccb45',
    alignItems: 'center',
  },
  logo: {
    flexGrow: 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  avatar: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 3,
    width: 45,
    height: 45,
  },
  loginBtn: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});
export default AppHeader;
