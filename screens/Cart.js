import React, { Fragment } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Image
} from 'react-native'
import CustomInput from '../Component/Input'
import ProductDescription from '../Component/ProductDescription'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { withNavigation, NavigationEvents } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { themeColor } from '../Constant'
import DocumentPicker from 'react-native-document-picker'
const url =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRI2GaDkRQ5FV83CxoXIu0tN2oVNIN8ANTLdnb4j00c-zYOVyBD'

class Cart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  static navigationOptions = {
    header: null
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader navigation = {navigation} home title={'Cart'} />
        <ScrollView>
          <ProductDescription
            title={'Medicine'}
            url={url}
            quantity={'10'}
            cart
            description={
              'The description is about The description is about The description is about The description is about'
            }
          />
        </ScrollView>
        <View style={{ marginVertical: 12 }}>
          <CustomButton title={'Buy Now'} onPress = {()=>navigation.navigate("Buy")}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  msgImage: { height: 41, width: 41, borderRadius: 5, marginHorizontal: 10 },
  inputContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 50,
    borderTopColor: themeColor,
    borderTopWidth: 0.5,
    alignItems: 'center'
  }
})
export default withNavigation(Cart)
