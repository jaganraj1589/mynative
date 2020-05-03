import React, {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {
  faHeart,
  faPlayCircle,
  faPauseCircle,
} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons';
import Player from './playeranimation';

const AudioPlayer = ({uri, audioduration}) => {
  let playbackInstance;
  const [done, setDone] = useState(0);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isBuffering: false,
  });

  const configureAudio = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  };

  const handlePlayBack = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    setDone(0);
    if (currentTrack == null || uri != currentTrack) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        url: uri,
        id: uri,
      });
      await TrackPlayer.play();
      setPlayerState(prevState => ({...prevState, isPlaying: true}));
      setDone(100);
    } else if (playerState.isPlaying) {
      await TrackPlayer.pause();
      setPlayerState(prevState => ({...prevState, isPlaying: false}));
    } else {
      await TrackPlayer.play();
      setPlayerState(prevState => ({...prevState, isPlaying: true}));
      setDone(100);
    }
  };

  const destroy = async () => {
    await TrackPlayer.destroy();
  };

  useEffect(async () => {
    await configureAudio();

    return destroy;
  }, []);

  return (
    <>
      <Player
        activeColor="#eb3434"
        passiveColor="#ccc"
        baseColor="white"
        width={5}
        done={done}
        radius={25}
        duration={audioduration}>
        <FontAwesomeIcon
          icon={playerState.isPlaying ? faPause : faPlay}
          size={15}
          color={playerState.isPlaying ? '#eb3434' : '#ccc'}
          onPress={handlePlayBack}
        />
      </Player>
    </>
  );
};

export default AudioPlayer;
