import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPodcast} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import LinearGradient from 'react-native-linear-gradient';

const AppHeader = () => {
  return (
    <LinearGradient
      style={styles.header}
      colors={['#fe3262', '#fb4c57', '#fb6e5c']}>
      <View style={styles.logo}>
        <FontAwesomeIcon icon={faPodcast} color={'#feb44b'} size={50} />
        <Text style={styles.logoText}>BADS</Text>
      </View>
      <View>
        <FontAwesomeIcon icon={faUser} color={'#fff'} size={24} />
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
});
export default AppHeader;
