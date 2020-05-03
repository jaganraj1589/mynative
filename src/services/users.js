import { getAxios } from '../utils/axios';
import { USER_ACTION_URL, USER_LOGIN_URL, USER_REQUEST_URL } from '../constants/urls';

export const userAction = (payload) => {

	return getAxios().post(USER_ACTION_URL, payload);
};

export const userLogin = (payload) => {
	return getAxios().post(USER_LOGIN_URL, payload);
}

export const userRequest = (payload) => {
	return getAxios().post(USER_REQUEST_URL, payload);
}