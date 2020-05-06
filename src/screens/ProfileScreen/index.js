import React, {useState, useEffect} from 'react';
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
import {Button, CheckBox, Icon} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import {useAppContextValue} from '../../stores/appcontext';

const ProfileScreen = ({navigation}) => {
  const [country, setCountry] = useState(false);
  const toHome = () => {
    navigation.navigate('Home');
  };
  const selecthandle = e => {
    country ? setCountry(false) : setCountry(true);
  };

  const {feedByLCFilter} = useAppContextValue();

  const [countryList, setCountryList] = useState({
    country: [
      {id: 1, value: 'india', isChecked: false},
      {id: 2, value: 'france', isChecked: false},
      {id: 3, value: 'singapore', isChecked: false},
      {id: 4, value: 'honkong', isChecked: false},
    ],
  });

  const [languageList, setLanguageList] = useState({
    language: [
      {id: 1, value: 'english', isChecked: false},
      {id: 2, value: 'french', isChecked: false},
      {id: 3, value: 'tamil', isChecked: false},
      {id: 4, value: 'chinese', isChecked: false},
    ],
  });

  const handleCountryCheck = id => {
    let contries = countryList.country;
    contries.forEach(a => {
      if (a.id === id) a.isChecked = !a.isChecked;
    });
    setCountryList({country: contries});
  };
  const handleLanguageCheck = id => {
    let lang = languageList.language;
    lang.forEach(a => {
      if (a.id === id) a.isChecked = !a.isChecked;
    });
    setLanguageList({language: lang});
  };

  const applyFilter = () => {
    let lang = [];
    let country = [];
    languageList.language.map(data => {
      if (data.isChecked) lang.push(data.value);
    });
    countryList.country.map(data => {
      if (data.isChecked) country.push(data.value);
    });
    if (lang.length || country.length) {
      feedByLCFilter({
        language: lang,
        country: country,
      });
      toHome();
    } else {
      Toast.show('Please select atleast one filter.', 3, Toast.LONG, Toast.TOP);
    }
  };
  useEffect(() => {}, [countryList]);

  return (
    <View>
      {/* <AppHeader navigation={navigation} /> */}
      <View style={styles.filterPage}>
        <View style={{justifyContent: 'space-between', height: '100%'}}>
          <Text style={styles.audioTitle}>Filter</Text>
          <View style={{marginTop: 0, flex: 1}}>
            <View>
              <Text style={styles.countryTitle}>Countries</Text>
              <ScrollView style={styles.filterheight}>
                <View style={styles.checkboxlist}>
                  {countryList &&
                    countryList.country.map(checkbox => (
                      <CheckBox
                        key={checkbox.id}
                        title={checkbox.value}
                        containerStyle={{marginRight:0,}}
                        iconType="ionicon"
                        checkedColor="#d63529"
                        checkedIcon="ios-checkbox-outline"
                        uncheckedIcon="ios-square-outline"
                        onPress={() => handleCountryCheck(checkbox.id)}
                        checked={checkbox.isChecked}
                      />
                    ))}
                </View>
              </ScrollView>
            </View>
            <View>
              <Text style={styles.countryTitle}>Language</Text>
              <ScrollView style={styles.filterheight}>
                <View style={styles.checkboxlist}>
                  {languageList &&
                    languageList.language.map(checkbox => (
                      <CheckBox
                        key={checkbox.id}
                        title={checkbox.value}
                        containerStyle={{marginRight:0,}}
                        iconType="ionicon"
                        checkedColor="#d63529"
                        checkedIcon="ios-checkbox-outline"
                        uncheckedIcon="ios-square-outline"
                        onPress={() => handleLanguageCheck(checkbox.id)}
                        checked={checkbox.isChecked}
                      />
                    ))}
                </View>
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
                onPress={applyFilter}
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
    marginTop: 0,
  },
  filterheight: {
    height: height * 0.18,
  },
  checkboxlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  inputs: {
    marginBottom: 30,
    alignSelf: 'baseline',
    justifyContent: 'space-between',
    width: '100%',
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
