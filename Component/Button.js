import React, { Component } from 'react'
import { Button  , Icon } from 'react-native-elements'
import {themeColor} from '../Constant/index'
export default CustomButton = props => 
<Button title={props.title}
icon={props.iconName ?
    <Icon
    style = {{padding : 6}}
      name={props.iconName}
      type = {'font-awesome'}
      size={25}
      containerStyle = {{paddingRight : 25}}
      color="white"
    /> : null
  }
  {...props}
  containerStyle = {[{alignSelf : 'center' , width : 140  , } , props.containerStyle]}
  buttonStyle = {[{backgroundColor : props.backgroundColor ? props.backgroundColor : themeColor , 
  height : props.height ? props.height : 50  , borderRadius : 25} ,props.buttonStyle ]}
/>
