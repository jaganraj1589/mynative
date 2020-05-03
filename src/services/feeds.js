import { getAxios } from '../utils/axios';
import { GET_FEEDS_URL, FEED_ACTION_URL, ADD_FEED_URL } from '../constants/urls';

export const getFeeds = () => {

	return getAxios().post(GET_FEEDS_URL);
};

export const feedAction = (payload) => {

	return getAxios().post(FEED_ACTION_URL, payload);
};

export const addFeed = (formData) => {
	console.info(formData);
	return getAxios().post(ADD_FEED_URL, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
};