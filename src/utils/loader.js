import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Image} from 'react-native';
import {BarIndicator} from 'react-native-indicators';

const loaderImage = require('../../assets/images/loader.gif');
const Loader = ({loading}) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator color="#d63529" size="large" animating={loading} /> */}
          <BarIndicator
            color="#d63529"
            count={6}
            size={30}
            animationDuration={1000}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff40',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'transparent',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
