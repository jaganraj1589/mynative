import { AsyncStorage } from 'react-native';

export const saveSession = (values) => {
	AsyncStorage.setItem('userType', values.userType);
	AsyncStorage.setItem('userId', values.userId);
	AsyncStorage.setItem('email', values.email);
	AsyncStorage.setItem('profilePic', values.profilePic);
	AsyncStorage.setItem('name', values.name);
	AsyncStorage.setItem('instaFollowers', values.instaFollowers);
	AsyncStorage.setItem('appFollowers', values.appFollowers);
};

export const getSession = async () => {
	return {
		userType: await AsyncStorage.setItem('userType'),
		userId: await AsyncStorage.setItem('userId'),
		email: await AsyncStorage.setItem('email')
	};
};

export const removeSession = async () => {
	await AsyncStorage.removeItem("userType");
	await AsyncStorage.removeItem("userId");
	await AsyncStorage.removeItem("email");
	await AsyncStorage.removeItem("profilePic");
	await AsyncStorage.removeItem("name");
	await AsyncStorage.removeItem("instaFollowers");
	await AsyncStorage.removeItem("appFollowers");
};