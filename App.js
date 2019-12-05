import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView , StatusBar } from 'react-native';
import Routes from './navigation'
import {themeColor} from './Constant/index'
export default class App extends Component {
  constructor(props){
    super(props)
    console.disableYellowBox = true;
  }

  render() {
    return (
        <Routes />
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
