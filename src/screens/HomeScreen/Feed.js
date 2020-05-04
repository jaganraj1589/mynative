import React, {useState, useEffect} from 'react';
import {Text, View, Image, Linking, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as faFilledHeart} from '@fortawesome/free-solid-svg-icons';

import AudioPlayer from '../../components/AudioPlayer';
import styles from './style.js';
import {feedAction} from '../../services/feeds';
import {userAction} from '../../services/users';
import {timeSince} from '../../utils/timesince';


const Feed = ({feed}) => {
  const [feedState, setFeedState] = useState({
    likes: feed.likes,
    isLiked: feed.isLiked,
    isFollowed: feed.isFollowed,
    followers: feed.followers,
  });

  const likeUnlike = () => {
    if (feedState.isLiked === 1) {
      setFeedState(prevState => ({
        ...prevState,
        isLiked: 0,
        likes: prevState.likes - 1,
      }));
    } else {
      setFeedState(prevState => ({
        ...prevState,
        isLiked: 1,
        likes: prevState.likes + 1,
      }));
    }
    feedAction({feedId: feed._id, action: feedState.isLiked ? 0 : 1})
      .then(() => {})
      .catch(response => {
        console.error(response.body);
      });
  };

  const followUnFollow = () => {
    if (feedState.isFollowed === 1) {
      setFeedState(prevState => ({
        ...prevState,
        isFollowed: 0,
        followers: prevState.followers - 1,
      }));
    } else {
      setFeedState(prevState => ({
        ...prevState,
        isFollowed: 1,
        followers: prevState.followers + 1,
      }));
    }
    userAction({
      followerId: feed.speakerId,
      action: feedState.isFollowed ? 0 : 1,
    })
      .then(() => {})
      .catch(({response}) => {
        console.info(response);
      });
  };

  const secondsToHms = millis => {
    var seconds = millis * 1000;
    return seconds;
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.userNameBlock}>
          <Image
            style={styles.userImage}
            source={{
              uri: feed.profile_pic,
            }}
          />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{feed.name}</Text>
        </View>
        <View style={styles.followBlock}>
          <Text
            style={{
              textAlign: 'center',
              width: 100,
              fontSize: 12,
              color: '#545454',
            }}>
            {feedState.followers} Followers
          </Text>
          <TouchableOpacity
            style={feedState.isFollowed ? styles.unfollowBtn : styles.followBtn}
            onPress={followUnFollow}>
            <Text
              style={
                feedState.isFollowed ? styles.unfollowText : styles.followText
              }>
              {feedState.isFollowed ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detail}>
        <View style={styles.postDetail}>
          <Text style={{color: '#8c8c8c'}}>{timeSince(feed.createdAt)}</Text>
          <Text numberOfLines={1}>{feed.title}</Text>
          <Text numberOfLines={1} style={{color: '#8c8c8c'}}>
            {feed.duration + 'sec'}
          </Text>
          <Text
            numberOfLines={1}
            style={{color: '#4a7da5'}}
            onPress={() => Linking.openURL(feed.link)}>
            {feed.link}
          </Text>
        </View>

        <AudioPlayer
          uri={feed.audio}
          audioduration={secondsToHms(feed.duration)}
        />

        <View style={styles.likes}>
          <Text style={styles.likestext}>{feedState.likes} likes</Text>
          <FontAwesomeIcon
            icon={feedState.isLiked ? faFilledHeart : faHeart}
            color={'#eb3434'}
            onPress={likeUnlike}
            size={18}
          />
        </View>
      </View>
    </View>
  );
};

export default Feed;
