import React, { Component } from 'react'
import { Button  , Icon } from 'react-native-elements'
import {themeColor , pinkColor} from '../Constant/index'
import {FlatList , View , Text , StyleSheet ,Image} from 'react-native'
export default HorizontalList = props =>
<View>
<FlatList
  data={['1', '2', '3', '4', '5', '6', '7']}
  horizontal = {true}
  showsHorizontalScrollIndicator = {false}
  renderItem = {({item , index})=> <View style = {{marginHorizontal : 5}}>  
    <Image source = {{uri : ''}}
     style = {{height : props.height ? props.height :   120 , width : props.height ? props.height :   120 ,
      backgroundColor : '#fff' , borderRadius : 5}} />
      <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize: 15, margin:  2,}}>Product Name</Text>
      <Text style = {{color : 'grey' ,  fontSize: 12, margin:  2,}}>$49</Text>
  </View>}
  />
    </View>