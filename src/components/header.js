import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPodcast} from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';

const AppHeader = ({setLogin}) => {
  return (
    <LinearGradient
      style={styles.header}
      colors={['#fe3262', '#fb4c57', '#fb6e5c']}>
      <View style={styles.logo}>
        <FontAwesomeIcon icon={faPodcast} color={'#feb44b'} size={50} />
        <Text style={styles.logoText}>BADS</Text>
      </View>
      <View>
        <Button
          type="solid"
          buttonStyle={styles.loginBtn}
          onPress={e => setLogin(true)}
          icon={<Icon name="user" size={30} color="#fff" />}
        />
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
    height: 70,
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
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
  },
  loginBtn: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});
export default AppHeader;
