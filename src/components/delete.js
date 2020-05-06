import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, AsyncStorage} from 'react-native';
import Modal from 'react-native-modal';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {userLogin, userRequest} from '../services/users';
import {saveSession, getSession} from '../services/storage';
import Loader from '../utils/loader';
import {useAppContextValue} from '../stores/appcontext';

const DeletePopup = ({setLogin, login, loadFeeds}) => {
  const {deletePop, setDeletePop} = useAppContextValue();
  return (
    <Modal
      isVisible={deletePop}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={1200}
      backdropTransitionOutTiming={1200}
      onBackdropPress={e => setDeletePop(false)}
      style={styles.modalPopup}>
      <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
        {/* <Loader loading={loading} /> */}
        <View style={styles.modalIn}>
          <Text style={styles.audioTitle}>Delete List</Text>
          <View>
            <Text style={{fontSize: 18, color: '#333'}}>
              Are you sure to delete this list?
            </Text>
          </View>
          <View style={styles.inputs}>
            <View style={styles.buttonsclose}>
              <Button
                type="solid"
                buttonStyle={styles.clsbutton}
                onPress={e => setDeletePop(false)}
                icon={<Icon name="close" size={20} color="#9c9c9c" />}
              />
              <Button
                type="solid"
                title="delete"
                buttonStyle={styles.button}
                icon={<Icon name="done" size={20} color="#fff" />}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  modalPopup: {
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
  },
  modalIn: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    // height: height * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
    marginBottom: 10,
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '100%',
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
    width: '100%',
  },
  button: {
    backgroundColor: '#d63529',
    marginLeft: 10,
    width: 100,
  },
  buttonApply: {
    backgroundColor: '#d63529',
    marginTop: 10,
    alignSelf: 'center',
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
export default DeletePopup;
