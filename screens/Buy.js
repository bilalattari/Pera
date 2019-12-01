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
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import CreditCard from 'react-native-credit-card';
const url ='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRI2GaDkRQ5FV83CxoXIu0tN2oVNIN8ANTLdnb4j00c-zYOVyBD'

class Buy extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  static navigationOptions = {
    header: null
  }
  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);
  paymentTitle = (title  , number)=>
  <View style =  {{flexDirection : "row" , justifyContent : 'space-between' , marginHorizontal : 15 , marginVertical : 6}}>
          <Text style = {{color : themeColor , fontSize : 16 , fontWeight : "bold"}}>{title}</Text>
          <Text style = {{color : themeColor , fontSize : 16}}>{number}</Text>
          </View>
  _onChange = (form)  => console.log(form);
        
  render () {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader home title={'Buy Now'} 
        navigation = {this.props.navigation}/>
        <ScrollView>
          <ProductDescription
            title={'Medicine'}
            url={url}
            quantity={'10'}
            cart = {true}
            description={
              'The description is about The description is about The description is about The description is about'
            }
          />
          <View style = {{paddingVertical : 24 , borderColor : themeColor , borderWidth : 2}}>
          <Text style = {styles.header}>ADDRESS</Text>
          <CustomInput  placeholder = {'Street'} textChange = {(text)=> console.log(text)}/>
          <CustomInput  placeholder = {'State'} textChange = {(text)=> console.log(text)}/>
          <CustomInput  placeholder = {'Zipcode'} textChange = {(text)=> console.log(text)}/>
          </View>
          <View style = {{paddingVertical : 24 , borderBottomColor : themeColor , borderBottomWidth : 2}}>
          <Text style = {styles.header}>DELIVERY</Text>
          <CustomInput  placeholder = {'Option 1'} textChange = {(text)=> console.log(text)}/>
          <CustomInput  placeholder = {'Option 2'} textChange = {(text)=> console.log(text)}/>
          <CustomInput  placeholder = {'Option 3'} textChange = {(text)=> console.log(text)}/>
          </View>
          <View style = {{paddingVertical : 24 , borderBottomColor : themeColor , borderBottomWidth : 2}}>
          <Text style = {styles.header}>PAYMENT</Text>
          {this.paymentTitle("Subtotal" , '$50.00')}
          {this.paymentTitle("Shipping" , '$5')}
          {this.paymentTitle("Hope Up (10%)" , '$5')}
          <Text style = {{paddingVertical : 12 , textAlign : "right" , marginRight  : 15 ,fontSize : 18,
           color : themeColor}}>TOTAL $60 </Text>
          </View>
          <View style = {{paddingVertical : 24 , borderBottomColor : themeColor , borderBottomWidth : 2}}>
          <Text style = {{color : themeColor , marginLeft : 15 , marginVertical : 2}}>CARD NUMBER</Text>
          <LiteCreditCardInput
              autoFocus
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onFocus={this._onFocus}
              onChange={this._onChange} />
          {/* <CreditCard
    type={'visa'}
    // imageFront={require('./images/card-front.png')}
    // imageBack={require('./images/card-back.png')}
    // shiny={false}
    // bar={false}
    focused={''}
    number={''}
    name={''}
    expiry={''}
    cvc={''}/> */}
          </View>

          <View style = {{marginVertical : 35}}>
              <CustomButton title  = {'PAY SECURE'} containerStyle = {{width : '90%'}} />
              </View>
        </ScrollView>
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
  },
  header : {color : themeColor , paddingHorizontal : 12 , padding : 4, fontWeight: "800" ,fontSize : 15 }
})
export default withNavigation(Buy)
