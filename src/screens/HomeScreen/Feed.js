import React from 'react';
import {Text, View, Image, Linking, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';

import AudioPlayer from '../../components/AudioPlayer';
import styles from './style.js';

const Feed = ({ feed }) => {
	console.info(feed);
	return (<View style={styles.card}>
	  <View style={styles.topRow}>
	    <View style={styles.userNameBlock}>
	      <Image
	        style={styles.userImage}
	        source={{
	          uri: feed.profile_pic,
	        }}
	      />
	      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
	        { feed.name }
	      </Text>
	    </View>
	    <View style={styles.followBlock}>
	      <Text style={{textAlign: 'center', width: 100, fontSize: 14}}>
	        {feed.followers} Followers
	      </Text>
	      <TouchableOpacity style={styles.followBtn}>
	        <Text style={{color: '#fff', textAlign: 'center'}}>
	          Follow
	        </Text>
	      </TouchableOpacity>
	    </View>
	  </View>
	  <View style={styles.detail}>
	    <View style={styles.postDetail}>
	      {/*<Text style={{color: '#8c8c8c'}}>8 mins ago</Text>*/}
	      <Text numberOfLines={1}>{feed.title}</Text>
	      <Text
	        numberOfLines={1}
	        style={{color: 'blue'}}
	        onPress={() => Linking.openURL(feed.link)}>
	        Link
	      </Text>
	    </View>

	    <AudioPlayer uri={feed.audio} />

	    <View style={styles.likes}>
	      <Text>{ feed.likes } likes</Text>
	      <FontAwesomeIcon icon={faHeart} color={'#eb3434'} />
	    </View>
	  </View>
	</View>);
};

export default Feed;