import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, AsyncStorage} from 'react-native';
import Modal from 'react-native-modal';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {userLogin, userRequest} from '../services/users';
import {saveSession, getSession} from '../services/storage';
import Loader from '../utils/loader';

const LoginPopUp = ({setLogin, login, loadFeeds}) => {
  const [email, setEmail] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [requestEmailErr, setRequestEmailErr] = useState('');
  const [apply, setApply] = useState('');
  const [loading, setLoading] = useState(false);

  const validateIsEmail = email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  const userLogins = () => {
    setLoading(true);
    userLogin({
      email: email,
      userType: 'listner',
    })
      .then(response => {
        setLoading(false);
        if (response.data && response.data.error) {
          setEmailErr(response.data.message);
        } else {
          if (response.data && response.data.data) {
            let userinfo = response.data.data[0];
            saveSession({
              email: userinfo.email ? userinfo.email : '',
              userType: userinfo.userType ? userinfo.userType : '',
              userId: userinfo._id ? userinfo._id : '',
            });
          }
          setLogin(false);
          loadFeeds();
        }
      })
      .catch(({response}) => {
        setLoading(false);
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
    setLoading(true);
    userRequest({
      email: requestEmail,
    })
      .then(response => {
        setLoading(false);
        if (response.data && response.data.error) {
          setRequestEmailErr(response.data.message);
        } else {
          setLogin(false);
        }
      })
      .catch(({response}) => {
        setLoading(false);
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

  const loadUserData = async () => {
    const session = await getSession();
  };
  const allInputs = () => {
    setLogin(false);
    setTimeout(() => {
      setApply(false);
    }, 200);
  };
  useEffect(() => {
    loadUserData();
  }, [setLogin]);

  return (
    <Modal
      isVisible={login}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={1200}
      backdropTransitionOutTiming={1200}
      onBackdropPress={e => setLogin(false)}
      style={styles.modalPopup}>
      <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
        <View style={styles.modalIn}>
          <Text style={styles.audioTitle}>Account Detail</Text>
          <View style={styles.inputs}>
            {!apply ? (
              <>
                <View style={styles.audioText}>
                  <Text style={styles.audioTextin}>
                    Please enter your email address if you want to be able to
                    retrieve your information in case you change phone (audios
                    you've liked, speakers you've followed)
                  </Text>
                </View>
                <View style={styles.buttons}>
                  <View style={{width: '70%'}}>
                    <Input
                      placeholder="Enter your Email id"
                      leftIcon={<Icon name="email" size={24} color="#ccc" />}
                      inputStyle={styles.inputss}
                      errorStyle={{color: 'red'}}
                      errorMessage={emailErr}
                      onChangeText={e => setEmail(e)}
                    />
                  </View>
                  <Button
                    type="solid"
                    title="Login"
                    buttonStyle={styles.button}
                    icon={<Icon name="done" size={20} color="#fff" />}
                    onPress={validateUserLogin}
                  />
                </View>
              </>
            ) : null}
            <View style={styles.audioText}>
              <Text style={styles.audioTextin}>
                Apply to become a verified speaker : for now, we only allow as
                verified speakers Instagram users who have a large enough number
                of followers. To apply for vetted speaker status, please enter
                your email address in the field here and then send that same
                email address for verification in a DM on Instagram to the
                account KRDS, we'll get back to you asap, thanks :)
              </Text>
              {apply ? null : (
                <Button
                  title="Apply"
                  type="solid"
                  buttonStyle={styles.buttonApply}
                  onPress={e => setApply(true)}
                />
              )}
            </View>
            {apply ? (
              <View style={styles.buttons}>
                <View style={{width: '70%'}}>
                  <Input
                    placeholder="Enter your Email id"
                    leftIcon={<Icon name="email" size={24} color="#ccc" />}
                    inputStyle={styles.inputss}
                    errorStyle={{color: 'red'}}
                    errorMessage={requestEmailErr}
                    onChangeText={e => setRequestEmail(e)}
                  />
                </View>
                <Button
                  type="solid"
                  title="Apply"
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
                onPress={allInputs}
                icon={<Icon name="close" size={20} color="#9c9c9c" />}
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
  audioText: {
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 5,
  },
  audioTextin: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#586267',
    textAlign: 'center',
    marginBottom: 5,
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
    width: '60%',
  },
  buttonApply: {
    backgroundColor: '#d63529',
    marginTop: 10,
    width: 100,
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
export default LoginPopUp;
