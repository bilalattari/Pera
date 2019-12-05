import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView
} from 'react-native';
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import {withNavigation} from 'react-navigation'
import Logo from '../Component/LogoImage'
import Modal from "react-native-modal";
import {themeColor , pinkColor  } from '../Constant/index'
import Slogan from '../Component/Slogan'
export default class ForgetPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showModel : false
    }
  }
  static navigationOptions = {
    header: null,
};
    render() {
      let  { showModel} = this.state
        return (
          <View style={styles.container}>
          <CustomHeader navigation = {this.props.navigation} title = {'FORGET PASSWORD'}  />

          <View style = {{flex : 1 , justifyContent : 'flex-end'}}>
            {
             showModel ?  
          <Modal isVisible={true} onBackButtonPress = {()=> this.setState({showModel : false})}>
          <View style={{ height : 300 , width : '90%'  , alignSelf : "center" , justifyContent : 'space-around',borderRadius : 5,
           backgroundColor : "#444544" , justifyContent : 'center' , alignItems : 'center' }}>
            <Text style = {{color : '#000' , paddingHorizontal : 25 , fontWeight : 'bold' , textAlign : 'center' }}>Please check your email address to reset your password</Text>
          </View>
        </Modal> : 
        null
            }
          <CustomInput placeholder = {'Text'} placeholderTextColor = {'#fff'} inputStyle = {{fontWeight : 'bold'}} />
          <View style  = {{marginVertical : 12}}>
            <CustomButton 
            onPress = {()=> this.setState({showModel : true})}
            title = {'Send'} containerStyle = {{width : '90%'}} backgroundColor = {pinkColor} />
            </View>
          </View>
          </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor : themeColor
      },
      labelStyle : {color : themeColor , fontSize: 14, paddingVertical: 2,},
    })
