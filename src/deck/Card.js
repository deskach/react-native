import React, { Component } from 'react';
import { Animated, PanResponder, View } from "react-native";
import PropTypes from 'prop-types';


export class Card extends Component {
  static propTypes = {
    onSwipeComplete: PropTypes.func,
    strategy: PropTypes.any.isRequired,
  };
  static defaultProps = {
    onSwipeComplete: _ => _,
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
      <View style={styles.card}>
        <Animated.View {...this.panResponder.panHandlers} style={style}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}


const styles = {
  card: {
    position: 'absolute',
    width: '100%',
  },
};
