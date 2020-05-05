import { getAxios } from '../utils/axios';
import { GET_FEEDS_URL, FEED_ACTION_URL, ADD_FEED_URL } from '../constants/urls';

export const getFeeds = () => {
	return getAxios().post(GET_FEEDS_URL);
};

export const feedAction = (payload) => {

	return getAxios().post(FEED_ACTION_URL, payload);
};

export const addFeed = (formdata) => {
	console.info(formdata);
	return getAxios().post(ADD_FEED_URL, formdata, {
          headers: {
          	'Accept': 'application/json',
            'content-type': 'multipart/form-data',
          },
      });
	// const config = {
	//   method: 'POST',
	//   headers: {
	//    'Accept': 'application/json',
	//    'Content-Type': 'multipart/form-data',
	//   },
	//   body: formdata,
	//  };
	// return fetch(ADD_FEED_URL, config);
};