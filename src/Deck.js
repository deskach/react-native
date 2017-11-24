import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";
import { uniqueId } from "./utils";
import { AnimatedItems } from "./Animated";

class Deck extends Component {
  static propTypes = { data: PropTypes.array, renderCard: PropTypes.func };
  static defaultProps = { data: [], renderCard: _ => _ };

  renderCards() {
    return this.props.data.map((c, i) => {
      if (i === 0) {
        return (
          <AnimatedItems key={uniqueId()} strategy={AnimatedItems.STRATEGY.ROTATE}>
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
