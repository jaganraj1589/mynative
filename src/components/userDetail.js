import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useAppContextValue} from '../stores/appcontext';
import {Avatar, Icon, Button} from 'react-native-elements';

const UserDetail = () => {
  const {userProfile, closeuserDetails} = useAppContextValue();
  return (
    <Modal
      isVisible={userProfile}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={1200}
      backdropTransitionOutTiming={1200}
      onBackdropPress={closeuserDetails}
      style={styles.modalPopup}>
      <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
        <View style={styles.modalIn}>
          <Text style={styles.popTitle}>Insta Profile details</Text>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
          <Text style={styles.userTitle}>jagan1589</Text>
          <Text style={styles.followText}>8 follwers</Text>
          <View style={styles.inputs}>
            <View style={styles.buttonsclose}>
              <Button
                type="solid"
                buttonStyle={styles.clsbutton}
                onPress={closeuserDetails}
                icon={<Icon name="close" size={20} color="#9c9c9c" />}
              />
              <Button
                type="solid"
                title="Change account"
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
  popTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#eb3434',
    paddingBottom: 5,
    borderColor: '#dedede',
    borderBottomWidth: 1,
    marginBottom: 50,
  },
  inputContainer: {
    width: 250,
  },
  userTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#353535',
    marginBottom: 10,
    marginTop: 10,
  },
  followText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#e45358',
    marginBottom: 10,
  },
  buttonsclose: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 50,
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
    marginTop: 20,
  },
  button: {
    height: 40,
    borderRadius: 2,
    backgroundColor: '#d63529',
    borderColor: '#d63529',
    borderWidth: 2,
    marginLeft: 20,
  },
  inputss: {
    fontSize: 14,
    width: '100%',
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

export default UserDetail;
