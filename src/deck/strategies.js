import React from 'react';
import { Animated } from "react-native";
import { LEFT, RIGHT, SCREEN_WIDTH, SWIPE_OUT_SPEED, SWIPE_THRESHOLD } from "./constants";

export const defaultStrategy = {
  panHandlers: {
    onPanResponderMove: (position, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (position, gesture, { onSwipeComplete }) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        Animated.timing(position, {
          toValue: { x: SCREEN_WIDTH, y: 0 },
          duration: SWIPE_OUT_SPEED
        }).start(() => onSwipeComplete(RIGHT));
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        Animated.timing(position, {
          toValue: { x: -SCREEN_WIDTH, y: 0 },
          duration: SWIPE_OUT_SPEED
        }).start(() => onSwipeComplete(LEFT));
      } else {
        Animated.spring(position, { toValue: { x: 0, y: 0 } }).start();
      }
    },
    onStartShouldSetPanResponder: (evt, gestureState) => true,
  },
  getCardStyle: position => position.getLayout(),
};

export const rotateStrategy = {
  ...defaultStrategy,
  getCardStyle: position => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }
};

export const slideStrategy = {
  ...defaultStrategy,
  panHandlers: {
    ...defaultStrategy.panHandlers,
    onPanResponderMove: (position, { dx }) => position.setValue({ x: dx }),
  }
};
