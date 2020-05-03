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


  const validateIsEmail = (email) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  const userLogins = () => {
    userLogin({
      email: email,
      userType: "listner"
    })
      .then((response) => { 
         if (response.data && response.data.error) {
          setEmailErr(response.data.message);
        } else {
          setLogin(false);
        }
       })
      .catch(({response}) => {
        console.info(response);
      });
  }
  const validateUserLogin = () => {
    if (!validateIsEmail(email) || email == "") {
      setEmailErr("Please enter valid email");
    } else {
      setEmailErr("");
      userLogins();
    }
  }
  const userRequests = () => {
    userRequest({
      email: requestEmail
    })
      .then((response) => { 
        if (response.data && response.data.error) {
          setRequestEmailErr(response.data.message);
        } else {
          setLogin(false);
        }
       })
      .catch(({response}) => {
        console.info(response);
      });
  }
  const validateUserRequest = () => {
    if (!validateIsEmail(requestEmail) || requestEmail == "") {
      setRequestEmailErr("Please enter valid email");
    } else {
      setRequestEmailErr("");
      userRequests();
    }
  }
  return (
    <View>
      <Modal animationType="fade" transparent>
        <View style={styles.modalPopup}>
          <View style={styles.modalIn}>
            <Text style={styles.audioTitle}>Account Detail</Text>
            <View style={styles.inputs}>
              <Input
                placeholder="Enter your Email id"
                errorStyle={{color: 'red'}}
                errorMessage={emailErr}
                onChangeText={e => setEmail(e)}
              />
              <View style={styles.buttons}>
                <Button
                  type="solid"
                  buttonStyle={styles.button}
                  icon={<Icon name="done" size={30} color="#0caf46"/>}
                  onPress={validateUserLogin}
                />
              </View>
              <Text style={styles.audioText}>
                Or Apply to become a verified speaker
              </Text>
              <Input
                placeholder="Enter your Email id"
                errorStyle={{color: 'red'}}
                errorMessage={requestEmailErr}
                onChangeText={e => setRequestEmail(e)}
              />
              <View style={styles.buttons}>
                <Button
                  type="solid"
                  buttonStyle={styles.button}
                  icon={<Icon name="done" size={30} color="#0caf46" />}
                  onPress={validateUserRequest}
                />
              </View>
              <View style={styles.buttons}>
                <Button
                  type="solid"
                  buttonStyle={styles.button}
                  onPress={e => setLogin(false)}
                  icon={<Icon name="close" size={30} color="#9c9c9c" />}
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
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
    marginBottom: 10,
    marginTop: 50,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
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
export default LoginPopUp;
