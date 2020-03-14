/* eslint-disable */

import React, { Component } from 'react'
import CustomButton from './Button'
import { View , Image , StyleSheet , Text , TouchableOpacity} from 'react-native'
import {themeColor} from '../Constant/index'
export default ProductDescription = ( props ) =>
<TouchableOpacity  {...props} style = {styles.container}>
<View style = {styles.row}> 
<Image source = {{uri : props.imageUrl}} 
style = {styles.imageStyle} />
<View style = {styles.titleView}>
<Text style = {styles.title}>{props.title}</Text>
</View>
<View style = {styles.quantityDescription}>
<Text style = {{ fontSize : 14 }}>{props.quantity}</Text>
</View>
</View>
<View style = {styles.descriptionView}>
<Text style = {{ fontSize : 14 }}>{props.description}</Text>
</View>
{
    props.cart ?
    <Text style = {{color : themeColor , fontSize : 16  , 
    marginRight : 4 , textAlign : "right" , marginVertical : 6}}>$50.00</Text> 
    :
<CustomButton title = {new Date().toLocaleDateString()} 
containerStyle = {{alignSelf: 'flex-end',marginTop: 8}} />
}
</TouchableOpacity>



const styles  = StyleSheet.create({
container : {marginHorizontal : 12 , marginVertical : 6},
row : {flexDirection  : "row" , height : 50 , alignItems : "center"  ,
justifyContent : "space-between"},
imageStyle : {height : 48 , width:  55 , borderRadius : 5 , },
titleView : {height : 45 , width : "65%" , borderWidth :1 , borderColor : themeColor ,
borderRadius : 3 , justifyContent : "center"  },
title : {paddingLeft : 8 , fontSize : 18 , fontWeight  : 'bold' },
quantityDescription : {height : 45 , width : "15%" , borderWidth :1 , borderColor : themeColor ,
alignItems : "center" , justifyContent : 'center',
borderRadius : 3 , justifyContent : "center"  },
descriptionView : {height : 120  , borderWidth :1 , marginTop : 6,
    borderColor : themeColor ,padding : 12,alignSelf : "center",
   borderRadius : 3   , width : '100%' },
})
