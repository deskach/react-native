import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";

class Deck extends Component {
  static propTypes = { data: PropTypes.array, renderCard: PropTypes.func };
  static defaultProps = { data: [], renderCard: _ => _ };

  renderCards() {
    return this.props.data.map(it => this.props.renderCard(it));
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
