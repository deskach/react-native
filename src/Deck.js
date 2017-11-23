import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";
import { uniqueId } from "./utils";
import { Rotate } from "./animated/rotate";
import { Slide } from "./animated/slide";

class Deck extends Component {
  static propTypes = { data: PropTypes.array, renderCard: PropTypes.func };
  static defaultProps = { data: [], renderCard: _ => _ };

  renderCards() {
    return this.props.data.map((c, i) => {
      if (i === 0) {
        return (
          <Rotate key={uniqueId()}>{this.props.renderCard(c)}</Rotate>
        );
      } else if (i === 1) {
        return (
          <Slide key={uniqueId()}>{this.props.renderCard(c)}</Slide>
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
