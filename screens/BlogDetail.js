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
class BlogDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      follow: false
    }
  }
  static navigationOptions = {
    header: null
  }
_icon = (name , color) =>
<TouchableOpacity > 
<Icon type = {'font-awesome'} name = {name} color = {color}  containerStyle = {{marginHorizontal : 12}}/>
</TouchableOpacity>

  render () {
    const { navigation } = this.props
    let { follow } = this.state
    return (
      <ScrollView stickyHeaderIndices = {[0]} style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader title={'BLOG'} navigation = {navigation} home = {true} bookmark = {true}  />
        <View style={styles.title}>
        <View style = {{flexDirection : 'row'  ,alignItems: 'center'}}>
<Image
  source={require('../assets/avatar.png')}
  style={styles.imageStyle}
  />
<Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
  Jesicca DOE
</Text>
  </View>
  <CustomButton title = {'Follow'} 
  buttonStyle = {{borderColor : '#ccc' , borderWidth:  1, height : 40 }} 
  containerStyle = {{width : 120}} backgroundColor = {this.state.follow ? pinkColor : themeColor} />
    </View>
    <Image source = {require('../assets/download.jpg')} 
    style = {{height :200  , width : '97%' , alignSelf : 'center' , marginVertical : 11 ,
    borderRadius : 12 }} />

    <Text style = {{color : '#fff' , fontSize : 20  , fontWeight : 'bold' , 
    paddingLeft: 12, marginVertical : 12}}> Beauty </Text>
    <Text style = {{color : '#fff' , fontSize : 18  , 
    paddingHorizontal:  12, marginVertical : 12}}>Lorem Spum Taken Lorem Spum Taken Lorem Spum 
    Taken Lorem Spum Taken Lorem Spum Taken Lorem Spum Taken Lorem Spum Taken Lorem Spum Taken
    Lorem Spum Taken Lorem Spum Taken Lorem Spum TakenLorem Spum TakenLorem Spum Taken Lorem Spum Taken  </Text>
       </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageStyle: {
    height: 45,
    width: 45,
    borderRadius: 125,
    marginHorizontal: 12,
    resizeMode: 'contain'
  },
  title : { flexDirection: 'row', paddingHorizontal: 6, alignItems: 'center' , justifyContent : 'space-between' },
  blogHeading : {color : '#fff'  , fontSize : 19 , fontWeight  : 'bold' , paddingLeft: 6,
  lineHeight : 26 , marginVertical : 8},
  likes : {color : '#ccc' , paddingLeft : 12 , paddingBottom:  4,borderBottomColor: '#ccc' , borderBottomWidth: 0.5,},

})
export default BlogDetail
