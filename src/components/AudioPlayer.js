import React, { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import {faHeart, faPlayCircle, faPauseCircle} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const AudioPlayer = ({ uri }) => {
	let playbackInstance;
	const [playerState, setPlayerState] = useState({ isPlaying: false, isBuffering: false });

	const configureAudio = async () => {
		await TrackPlayer.setupPlayer({});
		await TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
				TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
				TrackPlayer.CAPABILITY_STOP
			],
			compactCapabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE
			]
		});
	};


	const handlePlayBack = async () => {
		const currentTrack = await TrackPlayer.getCurrentTrack();

		if (currentTrack == null || uri != currentTrack) {
			await TrackPlayer.reset();
			await TrackPlayer.add({
				url: uri,
				id: uri,
			});
			await TrackPlayer.play();
			setPlayerState(prevState => ({ ...prevState, isPlaying: true }));
		} else if (playerState.isPlaying) {
			await TrackPlayer.pause();
			setPlayerState(prevState => ({ ...prevState, isPlaying: false }));
		} else { 
			await TrackPlayer.play();
			setPlayerState(prevState => ({ ...prevState, isPlaying: true }));
		}
	};

	const destroy = async () => {
		await TrackPlayer.destroy();
	};

	useEffect(async () => {
		await configureAudio();

		return destroy;
	}, []);

	return (<>
		<FontAwesomeIcon icon={playerState.isPlaying ? faPauseCircle :  faPlayCircle} size={50} color="#000" onPress={handlePlayBack} />
	</>);
};

export default AudioPlayer;