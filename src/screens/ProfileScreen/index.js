import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AppHeader from '../../components/header';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({navigation}) => {
  const [country, setCountry] = useState(false);
  const toHome = () => {
    navigation.navigate('Home');
  };
  const selecthandle = e => {
    country ? setCountry(false) : setCountry(true);
  };
  return (
    <View>
      {/* <AppHeader navigation={navigation} /> */}
      <View style={styles.filterPage}>
        <View>
          <Text style={styles.audioTitle}>Filter</Text>
          <View>
            <View>
              <Text style={styles.countryTitle}>Countries</Text>
              <ScrollView style={{height: 180}}>
                <CheckBox title="India" checked={country} />
                <CheckBox title="France" checked={country} />
                <CheckBox title="Singapore" checked={country} />
                <CheckBox title="Honkong" checked={country} />
              </ScrollView>
            </View>
            <View>
              <Text style={styles.countryTitle}>Language</Text>
              <ScrollView style={{height: 180}}>
                <CheckBox
                  title="Tamil"
                  checked={country}
                  onPress={e => selecthandle(e)}
                />
                <CheckBox title="English" checked={country} />
                <CheckBox title="French" checked={country} />
                <CheckBox title="Chinese" checked={country} />
              </ScrollView>
            </View>
          </View>
          <View style={styles.inputs}>
            <View style={styles.buttonsclose}>
              <Button
                type="solid"
                buttonStyle={styles.clsbutton}
                onPress={toHome}
                icon={<Icon name="close" size={20} color="#9c9c9c" />}
              />
              <Button
                type="solid"
                title="submit"
                buttonStyle={styles.button}
                icon={<Icon name="done" size={20} color="#fff" />}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  filterPage: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
  },
  audioTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#eb3434',
    paddingBottom: 5,
    borderColor: '#dedede',
    borderBottomWidth: 1,
  },
  countryTitle: {
    marginBottom: 5,
    marginTop: 20,
    width: '100%',
    textAlign: 'left',
    alignSelf: 'center',
    // backgroundColor: '#e4e4e4',
    padding: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  audioTextin: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#586267',
    textAlign: 'center',
    marginBottom: 10,
  },
  checklist: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 5,
    borderWidth: 0,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonsclose: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 50,
  },
  inputss: {
    fontSize: 14,
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#d63529',
    borderColor: '#d63529',
    borderWidth: 2,
    marginLeft: 20,
  },
  clsbutton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 2,
    marginLeft: 20,
  },
});
export default ProfileScreen;
