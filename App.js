/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';


import HomeScreen from './src/screens/HomeScreen/HomeScreen';
// const Stack = createStackNavigator();
const App = () => {
  return <HomeScreen />;
};
// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   }
// });
// const AppContainer = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
