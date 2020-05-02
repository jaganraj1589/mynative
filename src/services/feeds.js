import { getAxios } from '../utils/axios';
import { GET_FEEDS_URL, FEED_ACTION_URL } from '../constants/urls';

export const getFeeds = () => {

	return getAxios().post(GET_FEEDS_URL);
};

export const feedAction = (payload) => {

	return getAxios().post(FEED_ACTION_URL, payload);
};