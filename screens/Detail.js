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
        <CustomHeader title={'DETAIL'} navigation = {navigation}  />
        <ImageBackground source = {{uri : ''}} style = {{height : 250 , width : '100%' , backgroundColor : '#ccc' , justifyContent : 'space-between'}} resizeMode = 'stretch' >
          <View style = {{justifyContent : 'space-between' , flexDirection  : 'row' , marginHorizontal : 5 , marginTop : 5}}>
            <TouchableOpacity style = {styles.imageBtn}>
               <Icon type = {'font-awesome'} name = {'star-o'} color = {'#000'} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.imageBtn}>
               <Icon type = {'feather'} name = {'upload'} color = {'#000'} />
            </TouchableOpacity>
            </View>
            <View>
              <Text style = {styles.productName} >Product Name</Text>
              </View>
        </ImageBackground>
        <View style =  {[styles.borderBottom , {paddingTop : 8}]}>
        <View style = {styles.inputView}>
          <Input  placeholder = {'Select Color'} containerStyle = {{width : '70%'}} 
          inputContainerStyle = {styles.input} />
          <CustomButton title = {'$300'} 
  buttonStyle = {styles.borderButton} 
  containerStyle = {{width : 100}} backgroundColor = {this.state.follow ? pinkColor : themeColor} />
        </View>
        <CustomButton title = {'Buy'} backgroundColor = {pinkColor} 
        containerStyle = {[{width : '90%' , marginTop : 12}]} />
          </View>
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
  <View style = {styles.borderBottom}>
  <View style={[styles.title , {marginVertical : 15 }]}>
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
  buttonStyle = {styles.borderButton} 
  containerStyle = {{width : 120}} backgroundColor = {this.state.follow ? pinkColor : themeColor} />
    </View>
  <HorizontalList />
    </View>
      <Text style = {{paddingLeft: 18 , fontSize : 16 , color : '#fff' ,
       fontWeight : 'bold' , marginVertical: 12,}}>OTHER PRODUCTS</Text>
  <HorizontalList height = {140} productInfo = {true} />
  </View>
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
    height: 45,
    width: 45,
    borderRadius: 125,
    marginHorizontal: 12,
    resizeMode: 'contain'
  },
  input : {height : 45 , backgroundColor : '#fff' , borderRadius  : 5 , paddingLeft : 6},
  inputView : {flexDirection : 'row' , justifyContent : 'space-around' , marginVertical : 5 },
  borderButton : {borderColor : '#ccc' , borderWidth:  1, height : 40 },
  borderBottom : {borderBottomColor : '#454545' , borderBottomWidth : 8 , paddingBottom : 25},
  imageBtn : {height : 40 , width : 40 , backgroundColor :'#fff' , borderRadius : 25  ,
  justifyContent : 'center'  , alignItems : 'center' },
  productName : {margin: 12, color : '#fff' , fontSize : 28 , fontWeight : 'bold'},
})
export default Detail
