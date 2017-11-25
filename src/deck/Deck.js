import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from "./Card";
import { defaultStrategy, rotateStrategy, slideStrategy } from "./strategies";
import { RIGHT } from "./constants";

class Deck extends Component {
  static propTypes = {
    data: PropTypes.array,
    strategy: PropTypes.any,
    renderCard: PropTypes.func.isRequired,
    renderEmptyDeck: PropTypes.func.isRequired,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
  };
  static defaultProps = {
    data: [], renderCard: _ => _,
    strategy: defaultStrategy,
    onSwipeLeft: _ => _,
    onSwipeRight: _ => _,
  };
  static STRATEGY = {
    ROTATE: rotateStrategy,
    SLIDE: slideStrategy,
    DEFAULT: defaultStrategy,
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
    const { onSwipeLeft, onSwipeRight, data, strategy } = this.props;
    const { activeCardIndex } = this.state;

    if (activeCardIndex >= data.length) {
      return this.props.renderEmptyDeck();
    } else {
      return data.map((c, i) => {
        return (
          <Card strategy={strategy}
                key={i}
                onSwipeRight={onSwipeRight}
                onSwipeComplete={(...args) => this.onSwipeComplete(...args)}
                onSwipeLeft={onSwipeLeft}>
            {this.props.renderCard(c)}
          </Card>
        );
      }).reverse();
    }
  }
}


export default Deck;
