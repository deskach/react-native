import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";
import { AnimatedItems, RIGHT } from "./AnimatedItems";

class Deck extends Component {
  static propTypes = {
    data: PropTypes.array,
    renderCard: PropTypes.func.isRequired,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
  };
  static defaultProps = {
    data: [], renderCard: _ => _,
    onSwipeLeft: _ => _,
    onSwipeRight: _ => _,
  };

  state = {
    activeCard: 0,
  };

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const card = data[this.state.activeCard];

    (direction === RIGHT) ? onSwipeRight(card) : onSwipeLeft(card);
    this.setState({ activeCard: this.state.activeCard + 1 });
  }

  renderCards() {
    const { onSwipeLeft, onSwipeRight } = this.props;

    return this.props.data.map((c, i) => {
      if (i < this.state.activeCard) {
        return null;
      } else if (i === this.state.activeCard) {
        return (
          <AnimatedItems key={i} strategy={AnimatedItems.STRATEGY.ROTATE}
                         onSwipeRight={onSwipeRight}
                         onSwipeComplete={_ => this.onSwipeComplete()}
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
