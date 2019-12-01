import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {themeColor} from '../Constant/index'
export default (Slogan = props => (
  <Text style={styles.sloganText}>YOU HAVE THE POWER TO CHOOSE </Text>
))
const styles = StyleSheet.create({
  sloganText: {
    fontWeight: 'bold',
    color: themeColor,
    fontSize: 20,
    marginHorizontal: '10%',
    textAlign: 'center',
    marginVertical : 12
  }
})
