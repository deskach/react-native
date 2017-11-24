import React, { Component } from 'react';
import { Animated, Dimensions, PanResponder } from "react-native";
import PropTypes from 'prop-types';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 2;
const SWIPE_OUT_SPEED = 250;
const RIGHT = 1;
const LEFT = -1;

export const defaultStrategy = {
  panHandlers: {
    onPanResponderMove: (position, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (position,
                            gesture,
                            { onSwipeLeft, onSwipeRight, children }) => {
      const onSwipeComplete = (direction) => {
        (direction === RIGHT) ? onSwipeRight(children) : onSwipeLeft(children);
      };

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

export class AnimatedItems extends Component {
  static propTypes = {
    strategy: PropTypes.any,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
  };
  static defaultProps = {
    strategy: defaultStrategy,
    onSwipeLeft: _ => _,
    onSwipeRight: _ => _,
  };
  static STRATEGY = {
    ROTATE: rotateStrategy,
    SLIDE: slideStrategy,
    DEFAULT: defaultStrategy,
  };

  constructor(props) {
    super(props);

    const {
      onPanResponderMove,
      onPanResponderRelease,
      onStartShouldSetPanResponder
    } = this.props.strategy.panHandlers;

    this.position = new Animated.ValueXY(0, 0);
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder,
      onPanResponderRelease: (evt, gesture) => onPanResponderRelease(
        this.position, gesture, this.props
      ),
      onPanResponderMove: (evt, gesture) => onPanResponderMove(this.position, gesture),
    });
  }

  render() {
    const style = this.props.strategy.getCardStyle(this.position);

    return (
      <Animated.View {...this.panResponder.panHandlers} style={style}>
        {this.props.children}
      </Animated.View>
    );
  }
}

