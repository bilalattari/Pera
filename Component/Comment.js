import React, { Component } from 'react'
import {View , Text , StyleSheet , Image} from 'react-native'
import { SearchBar  ,Icon} from 'react-native-elements'
import {themeColor} from '../Constant/index'

export default Comment = ( props ) => 
<View key = {props.index} style = {{flexDirection : "row" , padding : 10 , alignItems : "center" ,}}>
<Image source = {require('../assets/avatar.png')} 
style = {[styles.msgImage , {borderRadius : 4}]} />
<Text style = {[styles.videoTitle , {flex : 1}]}>{props.text}</Text>
</View>


const styles = StyleSheet.create({
    videoTitle : {fontWeight : "bold" , color : themeColor , fontSize : 16},
    msgImage : {height : 45 , width : 45 , borderRadius : 7 , marginHorizontal : 10},
  })

