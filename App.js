/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			headerMode="none"
		>
			<Stack.Screen name="Home" component={HomeScreen} />
		</Stack.Navigator>
	);
};

const App = () => {
  	return (<NavigationContainer>
		<HomeStackNavigator />
	</NavigationContainer>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
