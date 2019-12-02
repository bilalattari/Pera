import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView
} from 'react-native';
import {Icon , Input , Button} from 'react-native-elements'
import CustomHeader from '../Component/header'
import CustomButton from '../Component/Button'

 class EmailAccount extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    header: null,
};
    render() {
      const {navigation} = this.props
        return (
            <View style={{backgroundColor : '#323643' , flex : 1 }}>
                <CustomHeader navigation = {navigation} title = {'Sign Up'} />
                 <View style = {{flex : 1 , alignItems : 'center' ,  justifyContent : "flex-end"}}>
                     <Input placeholder = {'Email'} placeholderTextColor = {'#fff'} 
                     inputContainerStyle = {styles.inputContainer} inputStyle = {{fontWeight : 'bold'}} />
                     <Input placeholder = {'Password'} secureTextEntry = {true} placeholderTextColor = {'#fff'} 
                     inputContainerStyle = {styles.inputContainer} inputStyle = {{fontWeight : 'bold'}} />
                    <Input placeholder = {'Confirm Password'} secureTextEntry = {true} placeholderTextColor = {'#fff'} 
                     inputContainerStyle = {styles.inputContainer} inputStyle = {{fontWeight : 'bold'}} />
                     <View style = {{marginVertical : 12 , width : "100%"}}>
                         <CustomButton title = {'Sign Up'} containerStyle = {{width  : "90%" }} buttonStyle  = {{borderColor: '#ccc', borderWidth : 1 ,}}/>
                         </View>
                     </View>
          </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      inputContainer : {borderColor : '#323643' , backgroundColor : '#454B61' , borderRadius : 7 , 
      paddingLeft : 12 , marginVertical : 6 },
      buttonStyle : {width : 140 , height : 45 ,  borderRadius : 25,
        backgroundColor : '#323643' , borderColor : "#fff" , borderWidth : 0.5 ,marginHorizontal : 6},
        bottomLink : {fontSize : 14 ,fontWeight : "bold",  color : "#ccc"},
        line : {flex : 1, height : 0.5, borderWidth : 0.3 , borderColor : "#ccc"}
    })
    export default EmailAccount
 