import React from 'react';
import { Base } from "./base";


export class Slide extends Base {
  onPanResponderMove = ({ dx }) => this.position.setValue({ x: dx });

  getCardStyle() {
    this.position.getLayout();
  }
}

