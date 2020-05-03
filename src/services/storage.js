import { AsyncStorage } from 'react-native';

export const saveSession = (values) => {
	AsyncStorage.setItem('userType', values.userType);
	AsyncStorage.setItem('userId', values.userId);
	AsyncStorage.setItem('email', values.email);
};
