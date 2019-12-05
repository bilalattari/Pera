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
class Support extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category : 0
    }
  }
  static navigationOptions = {
    header: null
  }

  listIcon = (text)=>
  <TouchableOpacity style = {{minHeight : 40 , flexDirection : 'row' , marginVertical : 5}}>
                <Icon type = {'font-awesome'} name = {'long-arrow-right'}
                 color = {pinkColor}  size = {25} containerStyle = {{marginHorizontal : 6 , width : '10%'}} />
                 <Text style = {{color : '#ccc' , fontSize : 16 }}>{text}</Text>
                </TouchableOpacity>
  render () {
    const { navigation } = this.props
    let { category } = this.state
    return (
      <ScrollView stickyHeaderIndices = {[0]}  style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader navigation = {navigation}  title={'SUPPORT & FAQ'}  />
        <View style = {{height : 250 , margin : 12 , borderRadius : 12, backgroundColor : "#444B60" }}>
            <View style = {{flex :1 , justifyContent : "center" , alignItems : "center"}}>
            <Text style = {{marginHorizontal: '22%', color : "#fff" , 
            fontWeight : "bold" , textAlign : "center" , fontSize:  18,}}>Hello! How can we help you?</Text>
            <Text style = {{marginHorizontal: '21%', color : "#bbb" , textAlign : "center" , fontSize:  15,}}>
                Press the heart button to add an hotel.</Text>    
             </View>
             <SearchBar
          containerStyle={{
            margin: 8,
            borderRadius: 5,
            borderTopColor: '#444B60',
            borderBottomColor: '#444B60'
          }}
          placeholder={'Search'}
          inputContainerStyle={{ backgroundColor: '#fff' }}
        />
            </View>
            <View style = {{borderBottomColor : '#ccc' , borderBottomWidth : 0.5 , paddingVertical : 12}}>
            <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 16 , paddingLeft: 14,
             marginVertical : 6}}>Payments & Discount Fees</Text> 
            {this.listIcon('Lorem spum asdassad')}
            {this.listIcon('Lorem spum asdassad')}
            {this.listIcon('Lorem spum asdassad')}
            {this.listIcon('Lorem spum asdassad')}
                </View>
                <View>
            <View style = {{borderBottomColor : '#ccc' , borderBottomWidth : 0.5 , paddingVertical : 12}}>
            <Text style = {{color : '#fff' , fontWeight : 'bold' , fontSize : 16 , paddingLeft: 14,
             marginVertical : 6}}>Booking information</Text> 
            {this.listIcon('Lorem spum asdassad')}
            {this.listIcon('Lorem spum asdassad')}
            {this.listIcon('Lorem spum asdassad')}
</View>
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
export default Support
