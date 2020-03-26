/* eslint-disable */
import React, { Component } from 'react';
import {  Text } from 'react-native';
import { themeColor, pinkColor } from '../Constant/index';
export default CustomText = props => (
    <Text style={[{
        fontSize: props.font ? props.font : 16,textAlign : props.align ? props.align : "center",
        fontWeight: props.bold ? "bold" : 'normal', letterSpacing : 0.3,
        color: props.color ? props.color : '#fff', marginLeft: props.marginLeft ? props.marginLeft : 0,
    }, props.style]}>{props.text}</Text>
);
