import React, {useState} from 'react';
import {View, Modal, StyleSheet, Dimensions, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import PlayBtn from './playbtn';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PopUp = ({setRecord}) => {
  const [title, setTitle] = useState('');
  const [audioText, setAudioText] = useState('');
  const [audiolink, setAudiolink] = useState('');
  return (
    <View>
      <Modal animationType="fade" transparent>
        <View style={styles.modalPopup}>
          <View style={styles.modalIn}>
            <Text style={styles.audioTitle}>Submit your Audio</Text>
            <Text style={styles.audioText}>Play Audio</Text>
            <PlayBtn />
            <View style={styles.inputs}>
              <Input
                placeholder="Enter your Audio Title"
                errorStyle={{color: 'red'}}
                errorMessage="Mandatory field"
                onChangeText={e => setTitle(e.value)}
              />
              <Input
                placeholder="Enter link text"
                errorStyle={{color: 'red'}}
                errorMessage="Mandatory field"
                onChangeText={e => setAudioText(e.value)}
              />
              <Input
                placeholder="Paste your link"
                errorStyle={{color: 'red'}}
                errorMessage="Mandatory field"
                onChangeText={e => setAudiolink(e.value)}
              />
              <View style={styles.buttons}>
                <Button
                  type="solid"
                  buttonStyle={styles.button}
                  onPress={e => setRecord(false)}
                  icon={<Icon name="close" size={30} color="#9c9c9c" />}
                />
                <Button
                  type="solid"
                  buttonStyle={styles.button}
                  icon={<Icon name="done" size={30} color="#0caf46" />}
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
    // height: height * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    alignItems: 'center',
  },
  inputContainer: {
    width: 250,
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
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
    marginBottom: 10,
  },
  inputs: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor: '#9c9c9c',
    borderWidth: 2,
  },
});
export default PopUp;
