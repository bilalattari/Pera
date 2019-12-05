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
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { SwipeListView } from 'react-native-swipe-list-view'

import { themeColor, pinkColor } from '../Constant'
class MyAddress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      follow: false,
      address : false,
    }
  }
  static navigationOptions = {
    header: null
  }
  address = (text) =>  <Text style = {{color : "#bbb" , paddingLeft : 40 , paddingVertical: 5,}}>{text}</Text>
  render () {
    const { navigation } = this.props
    let  { address} = this.state
    return (
      <View stickyHeaderIndices = {[0]} style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader title={'MY ADDRESS'}  navigation = {navigation}  />

        <View style = {{minHeight : 160  , paddingHorizontal : 12 ,
             justifyContent : "center" , borderTopColor : "#444B60" , borderTopWidth : 5 , borderBottomColor : "#444B60" , borderBottomWidth : 5 }}>
            <View style = {{flexDirection : 'row'}}> 
            <TouchableOpacity onPress = {()=> this.setState({address : !address})}>
                <Icon type = {"font-awesome"} name = { address ? 'circle' :  "circle-o"} color = {"#fff"} size = {25} />
                 </TouchableOpacity>
                 <Text style={{color : "#fff" , fontSize: 18 , fontWeight : "bold"  , paddingLeft: 12,}}> Address Name</Text>
            </View>
                {this.address('Lorem Spum dashj dsakjhd dasjk')}
                {this.address('Lorem Spum dashj')}
                {this.address('082189')}
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
export default MyAddress
