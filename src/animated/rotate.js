import React from 'react';
import { Dimensions } from "react-native";
import { Base } from "./base";


const SCREEN_WIDTH = Dimensions.get('window').width;

export class Rotate extends Base {
  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    };
  }
}
