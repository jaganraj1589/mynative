import React, {useState} from 'react';
import {View, Modal, StyleSheet, Dimensions, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {userLogin, userRequest} from '../services/users';

const LoginPopUp = ({setLogin}) => {
  const [email, setEmail] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [requestEmailErr, setRequestEmailErr] = useState('');
  const [apply, setApply] = useState('');

  const validateIsEmail = email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  const userLogins = () => {
    userLogin({
      email: email,
      userType: 'listner',
    })
      .then(response => {
        if (response.data && response.data.error) {
          setEmailErr(response.data.message);
        } else {
          setLogin(false);
        }
      })
      .catch(({response}) => {
        console.info(response);
      });
  };
  const validateUserLogin = () => {
    if (!validateIsEmail(email) || email == '') {
      setEmailErr('Please enter valid email');
    } else {
      setEmailErr('');
      userLogins();
    }
  };
  const userRequests = () => {
    userRequest({
      email: requestEmail,
    })
      .then(response => {
        if (response.data && response.data.error) {
          setRequestEmailErr(response.data.message);
        } else {
          setLogin(false);
        }
      })
      .catch(({response}) => {
        console.info(response);
      });
  };
  const validateUserRequest = () => {
    if (!validateIsEmail(requestEmail) || requestEmail == '') {
      setRequestEmailErr('Please enter valid email');
    } else {
      setRequestEmailErr('');
      userRequests();
    }
  };
  return (
    <View>
      <Modal animationType="fade" transparent>
        <View style={styles.modalPopup}>
          <View style={styles.modalIn}>
            <Text style={styles.audioTitle}>Account Detail</Text>
            <View style={styles.inputs}>
              <View style={styles.buttons}>
                <Input
                  placeholder="Enter your Email id"
                  leftIcon={<Icon name="email" size={24} color="#ccc" />}
                  inputStyle={styles.inputss}
                  errorStyle={{color: 'red'}}
                  errorMessage={emailErr}
                  onChangeText={e => setEmail(e)}
                />
                <Button
                  type="solid"
                  buttonStyle={styles.button}
                  icon={<Icon name="done" size={20} color="#fff" />}
                  onPress={validateUserLogin}
                />
              </View>
              <View style={styles.audioText}>
                <Text style={styles.audioTextin}>
                  Or Apply to become a verified speaker
                </Text>
                {apply ? null : (
                  <Button
                    title="Apply"
                    type="solid"
                    onPress={e => setApply(true)}
                  />
                )}
              </View>
              {apply ? (
                <View style={styles.buttons}>
                  <Input
                    placeholder="Enter your Email id"
                    leftIcon={<Icon name="email" size={24} color="#ccc" />}
                    inputStyle={styles.inputss}
                    errorStyle={{color: 'red'}}
                    errorMessage={requestEmailErr}
                    onChangeText={e => setRequestEmail(e)}
                  />
                  <Button
                    type="solid"
                    buttonStyle={styles.button}
                    icon={<Icon name="done" size={20} color="#fff" />}
                    onPress={validateUserRequest}
                  />
                </View>
              ) : null}

              <View style={styles.buttonsclose}>
                <Button
                  type="solid"
                  buttonStyle={styles.clsbutton}
                  onPress={e => setLogin(false)}
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
  inputs: {
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
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
export default LoginPopUp;
