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
class Privacy extends React.Component {
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
      <ScrollView stickyHeaderIndices = {[0]}  style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader navigation = {navigation}  title={'PRIVACY POLICY'}  />
                    <Text style = {{color : '#fff' , fontSize : 16 , margin: 12,}}
                    >Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category 
                    Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category
                    Please select the category  Please select the category Please select the category
                    </Text>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
export default Privacy
