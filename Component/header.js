import React, { Component } from 'react'
import { Header, Input, Icon } from 'react-native-elements'
import { StatusBar, View, Image, TouchableOpacity ,Platform } from 'react-native'
import { themeColor , pinkColor } from '../Constant/index'
import Logo from '../Component/LogoImage'
export default (CustomHeader = props => (
  <View>
    <StatusBar backgroundColor={themeColor} translucent />
    <Header
      barStyle='light-content' // or directly
      containerStyle={{ backgroundColor: themeColor , borderBottomColor : themeColor }}
      leftComponent={
          { icon: props.home ? 'menu' : 'arrow-back', color: '#fff' ,
           onPress : ()=> props.home ?  props.onPress()  :  props.navigation.goBack() }
      }
      centerComponent={{
        text: props.title,
        style: { color: '#fff', fontSize: 15  , fontWeight : 'bold'}
      }}
      rightComponent = {props.home  &&props.bookmark? 
        <Icon type = {"font-awesome"} name = {"bookmark-o"} color = {"#fff"} size = {20}/> :
        props.home && props.bookmark === undefined ?
       <Icon type = {"font-awesome"} name = {"ellipsis-h"} color = {"#fff"} /> :
       props.rightIcon ? 
       <Icon type = {"feather"} name = {"user-plus"} color = {"#fff"} size = {20}/> :
       null
      }
      
    />
  </View>
))
