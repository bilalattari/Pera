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
import HorizontalList from '../Component/HorizontalList'
import { themeColor, pinkColor } from '../Constant'
class Detail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      follow: false
    }
  }
  static navigationOptions = {
    header: null
  }

  textViews = (name , description)=>
  <View style = {{minHeight : 80 ,
   justifyContent : 'space-around' , padding : 12 , 
   borderBottomColor : 'grey' , borderBottomWidth : 0.5}}>
  <Text style = {{fontSize:  18, fontWeight : 'bold' , color : '#bbb'}}>{name}</Text>
  <Text style = {{color : 'grey' , }}>{description}</Text>
  </View>

  render () {
    const { navigation } = this.props
    let { follow } = this.state
    return (
      <ScrollView stickyHeaderIndices = {[0]} style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader title={'DETAIL'}  />
        <View style = {{paddingVertical :  25}}>
        {this.textViews('Description' , 'asdsadasdasdasd das das das das d asd as das ' )}
        {this.textViews('Ships From' , 'Canada' )}
        {this.textViews('Deliver From' , '15-30 days from italy' )}
        <View style = {{minHeight : 80 ,
   justifyContent : 'space-around' , padding : 12 ,  paddingBottom : 15,
   borderBottomColor : '#454545' , borderBottomWidth : 8}}>
  <Text style = {{fontSize:  18, fontWeight : 'bold' , color : '#bbb'}}>Return Policy</Text>
  <Text style = {{color : 'grey'}}>Vlaidad das da sd asd a sd asd ads das  da sad as d asd asd ad s das d asd a ds ad das d das d sa</Text>
  </View>

            </View>
            <HorizontalList />
       </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
export default Detail
