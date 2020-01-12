import React, { Component } from 'react'
import { SearchBar  ,Icon} from 'react-native-elements'
import {themeColor} from '../Constant/index'

export default SearchInput = ( props ) => 
  <SearchBar
  placeholder={'Search'}
  placeholderTextColor = {'#fff'}
  searchIcon = {<Icon type = {"font-awesome"} name = {"search"} color = {'#fff'}  size = {17}/>}
  containerStyle = {{backgroundColor : themeColor , borderWidth : 0 , borderBottomWidth : 0 ,
     borderTopColor : themeColor, padding : 0 , width : '90%' , margin : 6 , marginLeft : -5}}
  inputContainerStyle = {{backgroundColor : "#fff" , borderColor : themeColor ,
   borderWidth : 1 , height : 35 , opacity : 0.5, fontSize : 15, paddingTop : 4,color : '#fff',
   borderBottomColor : themeColor  , borderBottomWidth : 1 }}
//   onChangeText={this.updateSearch}
    {...props}
  />

