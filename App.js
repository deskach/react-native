/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Deck from "./src/Deck";
import { DECK } from './src/constants';
import { Button, Card } from 'react-native-elements';
import { uniqueId } from "./src/utils";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  renderCard(item) {
    return (
      <Card key={uniqueId()} title={item.text} image={{ uri: item.uri }}>
        <Text style={styles.cardText}>{item.text}</Text>
        <Button title={'View'} icon={{ name: 'code' }} backgroundColor={'#03a9f4'}/>
      </Card>
    );
  }

  renderEmptyDeck() {
    return (
      <View>
        <Text style={styles.instructions}>
          We are done!
        </Text>
        <Button title={'Reset'}
                icon={{ name: 'code' }}
                backgroundColor={'#03a9f4'}
                onPress={_ => _}/>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <Deck data={DECK.DATA}
                renderCard={this.renderCard}
                renderEmptyDeck={this.renderEmptyDeck}
                onSwipeRight={i => console.log('on swipe right')}
                onSwipeLeft={i => console.log('on swipe left')}/>
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  cardText: {
    marginBottom: 10,
  }
});
