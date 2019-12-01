import React, { Component } from 'react'
import { Button  , Icon } from 'react-native-elements'
import {themeColor , pinkColor} from '../Constant/index'
import {FlatList , View , Text , StyleSheet} from 'react-native'
export default HorizontalList = props =>
<FlatList data = {['1' , '2' , '3' , '4' , '5']}
horizontal = {true}
showsHorizontalScrollIndicator = {false}
renderItem  = {()=> 
<View style = {{height : 120 , width  : 100 , borderRadius :5 , 
    backgroundColor : '#ccc' , marginHorizontal : 5 }}> </View> }
/>