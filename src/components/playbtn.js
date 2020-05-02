import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop,
} from 'react-native-svg';
import {View, StyleSheet} from 'react-native';

const PlayBtn = () => {
  return (
    <View
      style={{
        width: 70,
        height: 70,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        padding: 0,
      }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{width: 70, height: 70}}>
        <Path
          d="M50.4597734,36.1314324 L26.4920573,49.6784024 C26.0112587,49.9501581 25.4011929,49.7806954 25.1294372,49.2998968 C25.044589,49.1497808 25,48.9802752 25,48.8078396 L25,21.7138995 C25,21.1616148 25.4477153,20.7138995 26,20.7138995 C26.1724356,20.7138995 26.3419412,20.7584885 26.4920573,20.8433367 L50.4597734,34.3903067 C50.940572,34.6620624 51.1100347,35.2721282 50.838279,35.7529268 C50.7488503,35.9111468 50.6179934,36.0420037 50.4597734,36.1314324 Z"
          id="Play-triangle"
          fill="#ccc"
        />
        <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <G fill="#fff">
            <G>
              {/* <Rect
                id="pause-rectangle"
                x="25.1428571"
                y="25.1428571"
                width="20.7142857"
                height="20.7142857"
                rx="1"
                fill="#ccc"
              /> */}
            </G>
          </G>
        </G>
        <G
          style={[
            styles.circle,
            {
              transform: [{rotate: '-90deg'}],
            },
          ]}>
          <Circle
            opacity="0.4"
            cx="35"
            cy="35"
            r="34"
            stroke="#ccc"
            strokeWidth="2"
          />
          <Circle
            strokeDasharray="300"
            strokeDashoffset="3"
            r="34"
            cx="35"
            cy="35"
            // stroke="#000"
            strokeWidth="2"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    transform: [{rotateX: '-90deg'}],
  },
});
export default PlayBtn;
