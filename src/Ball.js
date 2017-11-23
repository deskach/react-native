import React, { Component } from 'react';
import { View } from "react-native";

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

  render() {
    return (
      <View style={Ball.styles.ball}></View>
    );
  }
}


export default Ball;
