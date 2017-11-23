import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, PanResponder, View } from "react-native";
import { uniqueId } from "./utils";

const SCREEN_WIDTH = Dimensions.get('window').width;

function resetPosition(position) {
  Animated.spring(position, { toValue: { x: 0, y: 0 } }).start();
}

const animationStrategies = {
  slide: position => ({
    onPanResponderMove: ({ dx }) => position.setValue({ x: dx }),
    getCardStyle: () => position.getLayout(),
    onPanResponderRelease: () => resetPosition(position),
  }),
  rotate: position => ({
    onPanResponderMove: ({ dx, dy }) => position.setValue({ x: dx, y: dy }),
    getCardStyle: () => {
      const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
        outputRange: ['-120deg', '0deg', '120deg'],
      });

      return {
        ...position.getLayout(),
        transform: [{ rotate }]
      };
    },
    onPanResponderRelease: () => resetPosition(position),
  }),
};

class Deck extends Component {
  static propTypes = { data: PropTypes.array, renderCard: PropTypes.func };
  static defaultProps = { data: [], renderCard: _ => _ };

  strategy = animationStrategies.rotate(new Animated.ValueXY(0, 0));
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: _ => _,
    onPanResponderMove: (evt, gesture) => this.strategy.onPanResponderMove(gesture),
    onPanResponderRelease: _ => this.strategy.onPanResponderRelease(),
  });

  renderCards() {
    return this.props.data.map((c, i) => {
      if (i === 0) {
        return (
          <Animated.View {...this.panResponder.panHandlers}
                         key={uniqueId()}
                         style={this.strategy.getCardStyle()}>
            {this.props.renderCard(c)}
          </Animated.View>
        );
      }

      return this.props.renderCard(c);
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}


export default Deck;
