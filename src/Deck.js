import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";
import { AnimatedItems } from "./AnimatedItems";

class Deck extends Component {
  static propTypes = {
    data: PropTypes.array,
    renderCard: PropTypes.func,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
  };
  static defaultProps = { data: [], renderCard: _ => _ };

  renderCards() {
    const { onSwipeLeft, onSwipeRight } = this.props;

    return this.props.data.map((c, i) => {
      if (i === 0) {
        return (
          <AnimatedItems key={i} strategy={AnimatedItems.STRATEGY.ROTATE}
                         onSwipeRight={onSwipeRight}
                         onSwipeLeft={onSwipeLeft}>
            {this.props.renderCard(c)}
          </AnimatedItems>
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
