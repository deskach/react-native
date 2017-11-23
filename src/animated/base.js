import React, { Component } from 'react';
import { Animated, PanResponder } from "react-native";

export class Base extends Component {
  position = new Animated.ValueXY(0, 0);
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: _ => _,
    onPanResponderMove: (evt, gesture) => this.onPanResponderMove(gesture),
    onPanResponderRelease: _ => this.onPanResponderRelease(),
  });

  onPanResponderMove({ dx, dy }) {
    this.position.setValue({ x: dx, y: dy });
  };

  onPanResponderRelease() {
    this.resetPosition(this.position);
  };

  resetPosition() {
    Animated.spring(this.position, { toValue: { x: 0, y: 0 } }).start();
  }

  render() {
    return (
      <Animated.View {...this.panResponder.panHandlers}
                     style={this.getCardStyle()}>
        {this.props.children}
      </Animated.View>
    );
  }
}

