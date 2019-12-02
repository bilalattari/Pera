import React, { Fragment } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,ImageBackground,
  Text,
  ScrollView
} from 'react-native'
import { SearchBar, Icon, Input } from 'react-native-elements'
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { SwipeListView } from 'react-native-swipe-list-view'
import HorizontalList from '../Component/HorizontalList'
import { themeColor, pinkColor } from '../Constant'
class Yourchart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      next: false
    }
  }
  static navigationOptions = {
    header: null
  }

  render () {
    const { navigation } = this.props
    let { next } = this.state
    return (
      <ScrollView stickyHeaderIndices = {[0]} style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader navigation = {navigation} title={'Your Chart'}  />

    {
        next ? 
<View style = { styles.cartImage}>
        <Icon type = {"font-awesome"} name = {'shopping-cart'} color = {'#fff'}  size = {50}/> 
        </View>
        : 
<View style={[styles.title , {marginVertical : 15 }]}>
<View style = {[{flexDirection : 'row'  , flex : 1} ,  next ? styles.cartImage : null]}>

<Image
  source={require('../assets/avatar.png')}
  style={styles.imageStyle}
  />
  <View>
<Text style={{ paddingTop:4 , color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
  Product Name
</Text>
<Text style={styles.descriptionText}>
  Lorem Spum dsajkhdakjdhsakjdh
</Text>
</View>
  <Text style={[styles.descriptionText , {paddingTop:4 ,}]}>$24</Text>
  </View>
     </View>
    }
    <CustomButton onPress = {()=> this.setState({next : !next})} title = {next ? 'Continue'  :  'Next'} backgroundColor = {pinkColor} 
        containerStyle = {[{width : '90%' , marginTop : 12}]} />
              <Text style = {styles.listHeading}>Last Viewed</Text>
          <HorizontalList  productInfo = {true} />
          <Text style = {styles.listHeading}>Your Wish List</Text>
          <HorizontalList  productInfo = {true} />
       </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title : { flexDirection: 'row', paddingHorizontal: 6, alignItems: 'center' , justifyContent : 'space-between' },
  imageStyle: {
    height: 111,
    width: 111,
    borderRadius: 12    ,
    marginHorizontal: 12,
    resizeMode: 'contain'
  },
  cartImage : {justifyContent : 'center'  ,alignItems : 'center' , height : 150},
  descriptionText : { color: '#fff', fontSize: 13 , color : 'grey'},
  listHeading : {paddingLeft: 18 , fontSize : 16 , color : '#fff' ,
  fontWeight : 'bold' , marginVertical: 12,},
  input : {height : 45 , backgroundColor : '#fff' , borderRadius  : 5 , paddingLeft : 6},
  inputView : {flexDirection : 'row' , justifyContent : 'space-around' , marginVertical : 5 },
  borderButton : {borderColor : '#ccc' , borderWidth:  1, height : 40 },
  borderBottom : {borderBottomColor : '#454545' , borderBottomWidth : 8 , paddingBottom : 25},
  imageBtn : {height : 40 , width : 40 , backgroundColor :'#fff' , borderRadius : 25  ,
  justifyContent : 'center'  , alignItems : 'center' },
  productName : {margin: 12, color : '#fff' , fontSize : 28 , fontWeight : 'bold'},
})
export default Yourchart
