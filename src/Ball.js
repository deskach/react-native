import React, { Component } from 'react';
import { Animated, View } from "react-native";

class Ball extends Component {
  static styles = {
    ball: {
      height: 60,
      width: 60,
      borderRadius: 30,
      borderWidth: 30,
      borderColor: 'black',
    }
  };

  position = new Animated.ValueXY(0, 0);

  componentWillMount() {
    Animated.spring(this.position, { toValue: { x: 200, y: 400 }, }).start();
  }

  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={Ball.styles.ball}></View>
      </Animated.View>
    );
  }
}


export default Ball;
