import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder } from "react-native";

class Deck extends Component {
  static propTypes = { data: PropTypes.array, renderCard: PropTypes.func };
  static defaultProps = { data: [], renderCard: _ => _ };

  position = new Animated.ValueXY(0, 0);
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: _ => _,
    onPanResponderMove: (evt, { dx, dy }) => {
      this.position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: _ => _,
  });

  renderCards() {
    return this.props.data.map(it => this.props.renderCard(it));
  }

  render() {
    return (
      <Animated.View {...this.panResponder.panHandlers} style={this.position.getLayout()}>
        {this.renderCards()}
      </Animated.View>
    );
  }
}


export default Deck;
