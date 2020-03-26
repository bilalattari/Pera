/* eslint-disable */

import React, { Component } from 'react';
import { Button, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native'
import { themeColor, pinkColor, } from '../Constant/index';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text'
export default CustomButton = props => (
  props.backgroundColor === pinkColor ?
    <TouchableOpacity {...props} >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#FF6B98', '#FE787E', '#FE8663']}
        style={[{
          height: props.height ? props.height : 50, width: props.width ? props.width:  140, borderRadius: 25, alignSelf : 'center',
          justifyContent: "center", alignItems: "center"
        }, props.containerStyle , props.buttonStyle]}
      >
        <Text text={props.title} bold = {true} style = {props.titleStyle} />
      </LinearGradient>
    </TouchableOpacity> :
    <Button
      title={props.title}
      titleStyle={props.titleStyle}
      icon={
        props.iconName ? (
          <Icon
            style={{ padding: 6 }}
            name={props.iconName}
            type={'font-awesome'}
            size={25}
            containerStyle={{ paddingRight: 25 }}
            color="white"
          />
        ) : null
      }
      {...props}
      containerStyle={[{ alignSelf: 'center', width: props.width ? props.width : 140 }, props.containerStyle]}
      buttonStyle={[
        {
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : themeColor,
          height: props.height ? props.height : 50,
          borderRadius: 25,
        },
        props.buttonStyle,
      ]}

    />
);
