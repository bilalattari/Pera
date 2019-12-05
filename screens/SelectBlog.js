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
class SelectBlog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category : 0
    }
  }
  static navigationOptions = {
    header: null
  }
  

  render () {
    const { navigation } = this.props
    let { category } = this.state
    return (
      <View style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader  navigation = {navigation} title={'BLOG'}  />
        <View style =  {{height : 60 , borderBottomColor : "#ccc" , borderBottomWidth : 0.3}}>
        <FlatList
        data = {['For you' , 'Photography','Technology', 'Design' ,'For you' , ]}
        horizontal = {true}
        showsHorizontalScrollIndicator = {false}
        renderItem = {({item , index})=> 
        <Text  style = {{padding: 12, color :category === index  ? "#fff" : '#bbb', fontSize: 16,}}> {item}</Text> }
        />
        </View>
        <FlatList
        data = {['For you' , 'Photography','Technology', 'Design' ,'For you' , ]}
        numColumns = {2}
        renderItem = {({item , index})=> 
        <View style = {styles.imageContainer}>
            <Image source = {{uri : ''}} 
            style = {styles.image} />
             <Text style = {styles.textHeading}>Abcd Abcd Abcd Abcd Abcd Abcd</Text>
              <Text style = {{color : '#ccc' }}>73 Comments</Text>
       </View>
     }
        />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer : {width : '47%' , margin : 5},
  image :{height : 160 , width : '100%' , backgroundColor : '#fff' ,
  borderRadius : 12 , marginVertical : 4},
  textHeading : {color : '#fff' , fontWeight : 'bold' ,
  fontSize : 16},
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
})
export default SelectBlog
