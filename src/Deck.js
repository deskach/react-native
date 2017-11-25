import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";
import { AnimatedItems, RIGHT } from "./AnimatedItems";

class Deck extends Component {
  static propTypes = {
    data: PropTypes.array,
    renderCard: PropTypes.func.isRequired,
    renderEmptyDeck: PropTypes.func.isRequired,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
  };
  static defaultProps = {
    data: [], renderCard: _ => _,
    onSwipeLeft: _ => _,
    onSwipeRight: _ => _,
  };

  state = {
    activeCardIndex: 0,
  };

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const { activeCardIndex } = this.state;
    const card = data[activeCardIndex];

    (direction === RIGHT) ? onSwipeRight(card) : onSwipeLeft(card);
    this.setState({ activeCardIndex: activeCardIndex + 1 });
  }

  render() {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const { activeCardIndex } = this.state;

    if (activeCardIndex >= data.length) {
      return this.props.renderEmptyDeck();
    } else {
      return data.map((c, i) => {
        return (
          <View style={styles.card} key={i}>
            <AnimatedItems strategy={AnimatedItems.STRATEGY.ROTATE}
                           onSwipeRight={onSwipeRight}
                           onSwipeComplete={(...args) => this.onSwipeComplete(...args)}
                           onSwipeLeft={onSwipeLeft}>
              {this.props.renderCard(c)}
            </AnimatedItems>
          </View>
        );
      }).reverse();
    }
  }
}


const styles = {
  card: {
    position: 'absolute',
    width: '100%',
  },
};

export default Deck;
