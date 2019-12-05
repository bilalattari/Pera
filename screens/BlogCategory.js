import React, { Fragment } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import CustomInput from '../Component/Input'
import ControlPanel from '../screens/ControlPanel'
import CustomButton from '../Component/Button'
import {NavigationEvents} from 'react-navigation';

import CustomHeader from '../Component/header'
import Drawer from 'react-native-drawer'

import { themeColor, pinkColor } from '../Constant'
class BlogCategory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category : 0
    }
  }
  static navigationOptions = {
    header: null
  }
   getRandomInt =()=> {
    return Math.floor(Math.random() * Math.floor(4));
  }
  render () {
      const color = ['#f78da7' , '#abb8c3' , '#00d084' , '#03a9f4' , '#ff5722   ']
    const { navigation } = this.props
    let { category } = this.state
    return (
      <ScrollView style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader navigation = {navigation}  title={'BLOG CATEGORY'}  />
        <View style = {{height : 60 ,marginHorizontal : 15 , padding : 4}}>
                    <Text style = {{color : '#fff' , fontSize : 21 , fontWeight : 'bold' , marginVertical: 4,}}>Select Your Interest</Text>
                    <Text style = {{color : '#ccc' , fontSize : 16 , }}>Please select the category  Please select the category Please select the category </Text>
     </View>
     <View style = {{marginTop : 41 , flexDirection : 'row' , flexWrap : 'wrap' , justifyContent : 'center'}}>
     {
         ['1' , '2' , '3' ,'4', '5' , '6'].map((data , index)=> 
         <TouchableOpacity style = {{height : 150 ,margin : 6 , width : '45%' , borderColor : '#ccc' , 
         borderWidth : 0.5 , borderRadius : 5 , justifyContent : 'center' , alignItems : 'center' ,
         backgroundColor : index !== 0 ? color[this.getRandomInt()] : themeColor }}>
             {
                 index === 0 ?
                 <Icon type = {'font-awesome'} name = {'plus'} color = {'#fff'} size  = {41} />
                 :
                    <Text style = {{color : '#fff' , fontSize : 15 ,}}>Select Your </Text>
             }
     </TouchableOpacity>
         )
        }
        </View>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
export default BlogCategory
