import React, { Fragment } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView
} from 'react-native'
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { withNavigation, NavigationEvents } from 'react-navigation'
import { themeColor } from '../Constant'
import ProductDescription from '../Component/ProductDescription'

const url  =  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRI2GaDkRQ5FV83CxoXIu0tN2oVNIN8ANTLdnb4j00c-zYOVyBD'
class BoughtItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sold : this.props.navigation.getParam('sold'),
    }
  }
  static navigationOptions = {
    header: null
  }
  render () {
    const { navigation } = this.props
    return (
      <View style = {{flex  :1}} stickyHeaderIndices={[0]}>
        <CustomHeader home title={'BOUGHT ITEM'}
        navigation = {this.props.navigation} />
        <ProductDescription 
        title  = {"Medicine"} url = {url} quantity = {"10"} 
        bought = {true}
        description = {"The description is about The description is about The description is about The description is about" } />
        <View style = {{flexDirection : 'row' , justifyContent : 'space-around' , marginTop : 41 }}>
          {
            !this.state.sold ? 
            <CustomButton title = {'RETURN'} onPress = {()=> navigation.navigate('ReturnItem')}/> 
            :
            null
          }
            <CustomButton title = {'TRACK'} onPress = {()=> navigation.navigate('TrackItem')} /> 
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
//   backgroundVideo: {
//     height: 200,
//     width: '100%',
//     backgroundColor: themeColor
//   },
//   labelStyle :{ color: themeColor, fontSize: 14, paddingVertical: 2 },
//   header : {color : themeColor , padding : 12 , fontWeight: "800" ,fontSize : 20 }
})
export default withNavigation(BoughtItem)
