import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  PermissionsAndroid,
  Platform,
  AsyncStorage,
  Linking,
  ScrollView
} from 'react-native';
import fs from 'react-native-fs';

import {Input, Button,CheckBox} from 'react-native-elements';
import PlayBtn from './playbtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {addFeed} from '../services/feeds';
import Loader from '../utils/loader';
import {useAppContextValue} from '../stores/appcontext';
import Toast from 'react-native-simple-toast';

const RECORD_STATE = {
  START_RECORD: 'Start Record',
  STOP_RECORD: 'Stop Record',
  PLAY_RECORD: 'Play',
  PAUSE_RECORD: 'Pause',
};

const LIMIT = 60 * 1000;

const PopUp = ({setRecord, records}) => {
  const [loading, setLoading] = useState(false);
  const [titleErr, setTitleErr] = useState('');
  const [linkErr, setLinkErr] = useState('');
  const [validUrlErr, setValidUrlErr] = useState(false);
  const path = Platform.select({
    ios: 'hello.m4a',
    android: 'sdcard/hello.mp4',
  });
  const [title, setTitle] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [audiolink, setAudiolink] = useState('');
  const {canFeedReloadFn} = useAppContextValue();
  const [languageList, setLanguageList] = useState({
    language: [
      {id: 1, value: 'english', isChecked: false},
      {id: 2, value: 'french', isChecked: false},
      {id: 3, value: 'tamil', isChecked: false},
      {id: 4, value: 'chinese', isChecked: false},
    ],
  });

  useEffect(() => {
    if (validUrlErr) postFeed();
  }, [validUrlErr]);
  const [recorderState, setRecorderState] = useState({
    state: RECORD_STATE.START_RECORD,
    iconName: 'microphone-alt',
  });
  const [recording, setRecording] = useState({recordTime: 0});
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());

  const getPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecording(prevState => ({...prevState, recordSecs: 0}));
    console.log('onStopRecord', result);
  };

  const onStartRecord = async () => {
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener(e => {
      if (Math.floor(e.current_position) / LIMIT >= 1) {
        setRecorderState({state: RECORD_STATE.PLAY_RECORD, iconName: 'play'});
        onStopRecord();
      }
      setRecording(prevState => ({
        ...prevState,
        ...{
          recordSecs: e.current_position,
          recordTime: audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
        },
      }));
    });
    setFileUri(result);
    console.log('uri', result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);
    console.log('On Start Play', msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        setRecorderState({state: RECORD_STATE.PLAY_RECORD, iconName: 'play'});
        onPausePlay();
      }
      setRecording(prevState => ({
        ...prevState,
        ...{
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        },
      }));
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const handleRecord = async () => {
    console.info('Recorder state', recorderState.state);
    switch (recorderState.state) {
      case RECORD_STATE.START_RECORD:
        setRecorderState({state: RECORD_STATE.STOP_RECORD, iconName: 'stop'});
        onStartRecord();
        break;
      case RECORD_STATE.STOP_RECORD:
        setRecorderState({state: RECORD_STATE.PLAY_RECORD, iconName: 'play'});
        onStopRecord();
        break;
      case RECORD_STATE.PLAY_RECORD:
        setRecorderState({state: RECORD_STATE.PAUSE_RECORD, iconName: 'pause'});
        onStartPlay();
        break;
      case RECORD_STATE.PAUSE_RECORD:
        setRecorderState({state: RECORD_STATE.PLAY_RECORD, iconName: 'play'});
        onPausePlay();
        break;
    }
  };
   const onShouldStartLoadWithRequest = (url) => {
     Linking.canOpenURL(url).then(supported => {
         if (supported) {
            setValidUrlErr(true);
            setLinkErr("");
            return false;
         } else {
            setLinkErr("Please enter the valid url Ex.(http://google.com)")
            return true;
         }
     });
  }
  const handleLanguageCheck = id => {
    let lang = languageList.language;
    lang.forEach(a => {
      if (a.id === id) a.isChecked = !a.isChecked;
    });
    setLanguageList({language: lang});
  };
  const postFeed = async () => {
    setLoading(true);
    let speakerId = await AsyncStorage.getItem('userId');
    if (speakerId && speakerId != null) {
      let lang = [];
      languageList.language.map(data => {
        if (data.isChecked) lang.push(data.value);
      });
      if (title && fileUri && lang.length && audiolink && validUrlErr && !(title.length >51)) {
        console.log(lang);
        const formdata = new FormData();
        formdata.append('speakerId', await AsyncStorage.getItem('userId'));
        formdata.append('link', audiolink);
        formdata.append('language', lang.toString());
        formdata.append('title', title);
        formdata.append(
          'fileName',
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 5) + '.mp4',
        );
        const base64Audio = await fs.readFile(fileUri, 'base64');
        formdata.append('audio', `data:audio/mp4;base64,${base64Audio}`);
        addFeed(formdata)
          .then(response => {
            setLoading(false);
            setRecord(false);
            canFeedReloadFn();
          })
          .catch(e => {
            setTitleErr('Something went wrong please try again!');
            setLoading(false);
            console.log(e);
            Toast.show('Something went wrong please try again!',10,Toast.LONG,Toast.TOP);
          });
      } else {
        console.log(lang.length);
        setLoading(false);
        (!title || title.length >51) ? setTitleErr("Please enter the title(Max.50)") : setTitleErr("");
        (!fileUri) ? setTitleErr("Please record your speech") : "";
        !lang.length ? Toast.show('Please select Audio Language!',10,Toast.LONG,Toast.TOP) : ""
        !audiolink ? setLinkErr("Please enter the link") : onShouldStartLoadWithRequest(audiolink);
      }
    } else {
      Toast.show('Something went wrong try after some time!',10,Toast.LONG,Toast.TOP)
    }
  };

  useEffect(() => {
    audioRecorderPlayer.setSubscriptionDuration(0.09);
    getPermissions();

    return onStopPlay;
  }, []);

  useEffect(() => {
    console.info('Recorder statte', recorderState);
  }, [recorderState]);

  return (
    <Modal
      isVisible={records}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={1200}
      backdropTransitionOutTiming={1200}
      onBackdropPress={e => setRecord(false)}
      style={styles.modalPopup}>
      <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
       <Loader loading={loading} />
        <View style={styles.modalIn}>
          <Text style={styles.audioTitle}>Your Speech</Text>
          <Text style={styles.audioText}>{recorderState.state}</Text>
          <Icon
            name={recorderState.iconName}
            size={50}
            color={
              recorderState.iconName === 'microphone-alt'
                ? '#eb3434'
                : recorderState.iconName === 'play'
                ? '#1eb750'
                : recorderState.iconName === 'stop'
                ? '#eb3434'
                : '#333'
            }
            onPress={handleRecord}
          />
          <Text style={styles.audioText}>{recording.recordTime}</Text>
          <View style={styles.inputs}>
            <Input
              placeholder="Speech title"
              errorStyle={{color: 'red'}}
              errorMessage={titleErr}
              onChangeText={e => setTitle(e)}
            />
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
            <Input
                placeholder="Speech link Ex.(http://google.com)"
                errorStyle={{color: 'red'}}
                errorMessage={linkErr}
                onChangeText={e => setAudiolink(e)}
            />
            <View style={styles.buttons}>
              <Button
                type="solid"
                buttonStyle={styles.button}
                onPress={e => setRecord(false)}
                icon={<MaterialIcons name="close" size={30} color="#9c9c9c" />}
              />
              <Button
                type="solid"
                buttonStyle={styles.button}
                icon={<MaterialIcons name="done" size={30} color="#0caf46" />}
                onPress={postFeed}
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
    marginTop: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor: '#9c9c9c',
    borderWidth: 2,
  },
  inputss: {
    fontSize: 14,
    width: '100%',
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
    filterheight: {
    height: height * 0.18,
  },
  checkboxlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
export default PopUp;
