import { getAxios } from '../utils/axios';
import { USER_ACTION_URL } from '../constants/urls';

export const userAction = (payload) => {

	return getAxios().post(USER_ACTION_URL, payload);
};