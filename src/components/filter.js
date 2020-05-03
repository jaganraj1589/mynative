import React, {useState} from 'react';
import {View, Modal, StyleSheet, Dimensions, Text} from 'react-native';
import {CheckBox, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MultiSelect from 'react-native-multiple-select';

const Feedfilter = ({setFilter}) => {
  const [country, setCountry] = useState([]);
  const countryName = [
    {id: '1', name: 'America'},
    {id: '2', name: 'Argentina'},
    {id: '3', name: 'Armenia'},
    {id: '4', name: 'Australia'},
    {id: '5', name: 'Austria'},
    {id: '6', name: 'Azerbaijan'},
    {id: '7', name: 'Argentina'},
    {id: '8', name: 'Belarus'},
    {id: '9', name: 'Belgium'},
    {id: '10', name: 'Brazil'},
  ];
  const onSelectedItemsChange = country => {
    // setCountry(country);
  };
  return (
    <View>
      <Modal animationType="fade" transparent>
        <View style={styles.modalPopup}>
          <View style={styles.modalIn}>
            <Text style={styles.audioTitle}>Filter</Text>
            <View style={{flex: 1, padding: 30}}>
              <MultiSelect
                hideTags
                items={countryName}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedItemsChange(country)}
                selectedItems={countryName}
                selectText="Pick Items"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="#48d22b"
                submitButtonText="Submit"
              />
            </View>
            <View style={styles.inputs}>
              <View style={styles.buttonsclose}>
                <Button
                  type="solid"
                  buttonStyle={styles.clsbutton}
                  onPress={e => setFilter(false)}
                  icon={<Icon name="close" size={20} color="#9c9c9c" />}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  modalPopup: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalIn: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    alignItems: 'center',
  },
  audioTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#eb3434',
    paddingBottom: 5,
    borderColor: '#dedede',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  audioText: {
    marginBottom: 10,
    marginTop: 30,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#e4e4e4',
    padding: 10,
    borderRadius: 5,
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
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#4cb6ac',
    borderColor: '#4cb6ac',
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
export default Feedfilter;
