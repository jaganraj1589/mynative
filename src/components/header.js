import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPodcast} from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';

const AppHeader = ({navigation, showProfile, setLogin}) => {
  const toProfile = () => {
    navigation.navigate('profile');
  };

  return (
    <LinearGradient
      style={styles.header}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#fe3262', '#fb4c57', '#fb6e5c']}>
      <View style={styles.logo}>
        <FontAwesomeIcon icon={faPodcast} color={'#feb44b'} size={40} />
        <Text style={styles.logoText}>BADS</Text>
      </View>
      {showProfile && (
        <View>
          <Button
            type="solid"
            buttonStyle={styles.loginBtn}
            onPress={e => setLogin(true)}
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
  loginBtn: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});
export default AppHeader;
