import { getAxios } from '../utils/axios';
import { GET_FEEDS_URL } from '../constants/urls';

export const getFeeds = () => {

	return getAxios().post(GET_FEEDS_URL);
};