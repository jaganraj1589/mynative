import { AsyncStorage } from 'react-native';

export const saveSession = (values) => {
	AsyncStorage.setItem('userType', values.userType);
	AsyncStorage.setItem('userId', values.userId);
	AsyncStorage.setItem('email', values.email);
};

export const getSession = async () => {
	return {
		userType: await AsyncStorage.setItem('userType'),
		userId: await AsyncStorage.setItem('userId'),
		email: await AsyncStorage.setItem('email')
	};
};
