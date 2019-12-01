import React, { Component } from 'react'
import { Image , StyleSheet , View , Text} from 'react-native'
import {themeColor} from '../Constant/index'
export default Logo = props => 
    props.logo ? 
<View style = {{height : props.height ? props.height : 200 , flexDirection : 'row' ,
 justifyContent : 'center' , marginVertical : 12}}>
<Image source = {require("../assets/logohope.png")}
style = {{height : 150 , width : 150, resizeMode : 'contain' , }} />
<Image source = {require("../assets/hopeText.png")}
style = {{height : 150 , resizeMode : 'contain' , width : 150 , }} />
</View >
  : 
  <Image source = {require("../assets/hope.png")}
  style = {[styles.logo , {height : props.height ? props.height : 300 }]} />
const styles = StyleSheet.create({
    logo : {height : 300 , width : 300, resizeMode  : "contain" , alignSelf : "center" , marginVertical : 12 }
  })