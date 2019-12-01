import React, { Component } from 'react'
import { SearchBar  ,Icon} from 'react-native-elements'
import {themeColor} from '../Constant/index'

export default SearchInput = ( props ) => 
  <SearchBar
  placeholder={props.placeholder}
  searchIcon = {<Icon type = {"font-awesome"} name = {"search"} color = {themeColor}  size = {20}/>}
  containerStyle = {{backgroundColor : "#fff" , borderWidth : 0 , borderBottomWidth : 0}}
  inputContainerStyle = {{backgroundColor : "#fff" , borderColor : themeColor ,
   borderWidth : 1 , height : 50 , borderBottomColor : themeColor  , borderBottomWidth : 1 }}
//   onChangeText={this.updateSearch}
    {...props}
  />

