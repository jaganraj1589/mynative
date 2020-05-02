import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {faClock, faStar} from '@fortawesome/free-regular-svg-icons';

const AppFilter = () => {
  return (
    <View style={styles.filter}>
      <View style={styles.logo}>
        <FontAwesomeIcon icon={faFilter} color={'#333'} size={30} />
      </View>
      <View style={styles.sorting}>
        <FontAwesomeIcon icon={faStar} color={'#333'} size={24} />
        <FontAwesomeIcon icon={faClock} color={'#333'} size={24} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  filter: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    color: '#fff',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 2,
  },
  logo: {
    flexGrow: 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sorting: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
  },
});
export default AppFilter;