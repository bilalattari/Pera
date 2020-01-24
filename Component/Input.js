import React, { Component } from 'react'
import { Input  ,Icon} from 'react-native-elements'
import {themeColor} from '../Constant/index'

export default CustomInput = ( props ) => 
  <Input
    containerStyle={ [ { width: '100%' ,alignSelf : 'center' , 
    marginVertical : 6 ,  }  ,props.containerStyle ]}
    inputContainerStyle={[ { height : 45 , width : '92%' , 
    alignSelf : 'center' , borderBottomColor : "#E5E5E5" }
      ,props.inputContainerStyle]}
    inputStyle={{ fontSize: 16  }}
    keyboardType = {props.keyboardType  ? props.keyboardType : 'default'  }
    placeholder={props.placeholder}
    placeholderTextColor = {'#707070'}
    value = {props.value}
    underlineColorAndroid = {'#fff'}
    multiline = {props.multiline}
    rightIcon = {<Icon type = {'fontawesome'} name = {""} />}
    secureTextEntry = {props.secureTextEntry}
    onChangeText = {(text)=> props.textChange ?  props.textChange(text) : null}
    errorStyle={{ color: 'red' }}
    leftIcon={
      props.icon ? 
      <Icon
        name={props.icon}
        size={16}
        type = {'font-awesome'}
        color='#909291'
      /> : null
    }
    leftIconContainerStyle = {{padding : 0}}
    {...props}
  />

