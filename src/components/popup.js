import React, {useState, useEffect} from 'react';
import {
    View, Modal, StyleSheet, Dimensions, Text, 
    PermissionsAndroid, Platform, AsyncStorage
  } from 'react-native';
import fs from 'react-native-fs';

import {Input, Button} from 'react-native-elements';
import PlayBtn from './playbtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AudioRecorderPlayer,{
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {addFeed} from '../services/feeds';

const RECORD_STATE = {
  START_RECORD: "Start Record",
  STOP_RECORD: "Stop Record",
  PLAY_RECORD: "Play",
  PAUSE_RECORD: "Pause",
};

const LIMIT = 60 * 1000;

const PopUp = ({setRecord}) => {
  const path = Platform.select({
      ios: 'hello.m4a',
      android: 'sdcard/hello.mp4',
  });
  const [title, setTitle] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [audioText, setAudioText] = useState('');
  const [audiolink, setAudiolink] = useState('');
  const [ recorderState, setRecorderState ] = useState({ state: RECORD_STATE.START_RECORD, iconName: "microphone-alt" });
  const [ recording, setRecording ] = useState({recordTime: 0});
  const [audioRecorderPlayer, ] = useState(new AudioRecorderPlayer());

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
    console.log("onStopRecord",result);
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
    audioRecorderPlayer.addRecordBackListener((e) => {
      if ((Math.floor(e.current_position)/LIMIT) >= 1 ) {
        setRecorderState({ state: RECORD_STATE.PLAY_RECORD, iconName: "play" });
        onStopRecord();
      }
      setRecording(prevState => ({...prevState, ...{
        recordSecs: e.current_position,
        recordTime: audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      }}));
    });
    setFileUri(result);
    console.log("uri", result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);
    console.log("On Start Play",msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        setRecorderState({ state: RECORD_STATE.PLAY_RECORD, iconName: "play" });
        onPausePlay();
      }
      setRecording(prevState => ({...prevState, ...{
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      }}));
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
    console.info("Recorder state", recorderState.state);
    switch(recorderState.state) {
      case RECORD_STATE.START_RECORD:
        setRecorderState({ state: RECORD_STATE.STOP_RECORD, iconName: "stop" });
        onStartRecord();
        break;
      case RECORD_STATE.STOP_RECORD:
        setRecorderState({ state: RECORD_STATE.PLAY_RECORD, iconName: "play" });
        onStopRecord();
        break;
      case RECORD_STATE.PLAY_RECORD:
        setRecorderState({ state: RECORD_STATE.PAUSE_RECORD, iconName: "pause" });
        onStartPlay();
        break;
      case RECORD_STATE.PAUSE_RECORD:
        setRecorderState({ state: RECORD_STATE.PLAY_RECORD, iconName: "play" });
        onPausePlay();
        break;
    }
  };

  const postFeed  = async () => {
    if (title && audiolink && audioText && fileUri) {
      const formdata = new FormData();
      formdata.append("speakerId", await AsyncStorage.getItem('userId'));
      formdata.append("link", audiolink);
      formdata.append("language", audioText);
      formdata.append("title", title);
      formdata.append("fileName", Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)+".mp4");
      const base64Audio = await fs.readFile(fileUri, 'base64')
      formdata.append("audio", `data:audio/mp4;base64,${base64Audio}`);
      addFeed(formdata)
       .then((response) => {
         setRecord(false);
       })
       .catch((e) => {
         console.log(e);
       });
    }
  };

  useEffect(() => {
    audioRecorderPlayer.setSubscriptionDuration(0.09)
    getPermissions();

    return onStopPlay;
  }, []);

  useEffect(() => {
    console.info("Recorder statte", recorderState);
  }, [recorderState]);

  return (
    <View>
      <Modal animationType="fade" transparent>
        <View style={styles.modalPopup}>
          <View style={styles.modalIn}>
            <Text style={styles.audioTitle}>Submit your Audio</Text>
            <Text style={styles.audioText}>{recorderState.state}</Text>
            <Icon
              name={recorderState.iconName}
              size={50}
              color="#000"
              onPress={handleRecord}
            />
            <Text style={styles.audioText}>{recording.recordTime}</Text>
            <View style={styles.inputs}>
              <Input
                placeholder="Enter your Audio Title"
                errorStyle={{color: 'red'}}
                errorMessage="Mandatory field"
                onChangeText={e => setTitle(e)}
              />
              <Input
                placeholder="Enter language"
                errorStyle={{color: 'red'}}
                errorMessage="Mandatory field"
                onChangeText={e => {
                  setAudioText(e);
                }}
              />
              <Input
                placeholder="Paste your link"
                errorStyle={{color: 'red'}}
                errorMessage="Mandatory field"
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
