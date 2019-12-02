import React, { Fragment } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Switch,
  ScrollView
} from 'react-native'
import { SearchBar, Icon, Input } from 'react-native-elements'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Picker } from 'native-base'
import { themeColor, pinkColor } from '../Constant'
import countries from '../Constant/countries'
class MyOrders extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: '1',
      switch: false
    }
  }
  static navigationOptions = {
    header: null
  }
  onValueChange (value) {
    this.setState({
      selected: value
    })
  }
  render () {
    const { navigation } = this.props
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{ backgroundColor: '#323643', flex: 1 }}
      >
        <CustomHeader navigation = {navigation} title={'My Orders'} />
        <SearchBar
          containerStyle={{
            margin: 8,
            borderRadius: 5,
            borderTopColor: themeColor,
            borderBottomColor: themeColor
          }}
          placeholder={'Search'}
          inputContainerStyle={{ backgroundColor: '#fff' }}
        />
        <FlatList
          data={['1', '2', '3', '4', '5', '6', '7']}
          keyExtractor={item => item}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', marginVertical: 4 }}>
              <Image source={{ uri: '' }} style={styles.imageStyle} />
              <View>
                <Text
                  style={{
                    paddingTop: 4,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}
                >
                  Product Name
                </Text>
                <Text style={styles.descriptionText}>
                  Lorem Spum dsajkhdakjdhsakjdh
                </Text>
              </View>
              <Text style={[styles.descriptionText, { paddingTop: 4 }]}>
                $24
              </Text>
            </View>
          )}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageStyle: {
    height: 120,
    backgroundColor: '#fff',
    width: 120,
    borderRadius: 12,
    marginHorizontal: 12,
    resizeMode: 'contain'
  },
  descriptionText : { color: '#fff', fontSize: 13 , color : 'grey'},

})
export default MyOrders
