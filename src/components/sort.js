import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {faClock, faStar} from '@fortawesome/free-regular-svg-icons';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

const AppFilter = ({navigation}) => {
  const toProfile = () => {
    navigation.navigate('profile');
  };
  return (
    <View style={styles.filter}>
      <View style={styles.logo}>
        <Button
          type="clear"
          buttonStyle={styles.filtericon}
          onPress={toProfile}
          icon={<Icon name="filter" size={24} color="#828689" />}
        />
        {/* <FontAwesomeIcon icon={faFilter} color={'#828689'} size={24} /> */}
      </View>
      <View style={styles.sorting}>
        <FontAwesomeIcon icon={faStar} color={'#828689'} size={24} />
        <FontAwesomeIcon icon={faClock} color={'#828689'} size={24} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  filter: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: '#fff',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -20},
    shadowOpacity: 0.8,
    shadowRadius: 80,
    elevation: 10,
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
