import React, { Component } from 'react'
import {View , Text , StyleSheet , Image} from 'react-native'
import {themeColor} from '../Constant/index'

export default UserView = ( props ) => 
<View style = {{flexDirection : "row" , padding : 10 , backgroundColor : "skyblue" , alignItems : "center"}}>
             <Image source = {require('../assets/avatar.png')} 
             style = {styles.msgImage} />
                <Text style = {[styles.videoTitle , {fontSize : 17}]}>{props.userName}</Text>
              </View>
const styles = StyleSheet.create({
    videoTitle : {fontWeight : "bold" , color : themeColor , fontSize : 16},
    msgImage : {height : 45 , width : 45 , borderRadius : 7 , marginHorizontal : 10},
  })

