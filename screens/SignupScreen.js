import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView
} from 'react-native';
import {Icon , Input , Button} from 'react-native-elements'
import CustomButton from '../Component/Button'
import {themeColor, pinkColor} from '../Constant/index'

class SignUp extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    header: null,
};
    render() {
      const {navigation} = this.props
        return (
            <View style={{backgroundColor : '#323643' , flex : 1}}>
                <View style = {{height : 100 , flexDirection : 'row' , alignItems : 'center' ,
                 justifyContent : 'space-between' , marginHorizontal : 15 ,}}>
                    <Text style = {{color : '#fff' , fontSize : 25 , fontWeight : 'bold'}}>Sign Up</Text>
                    <Icon type = {'font-awesome'} name  = {'angle-left'} color = {'#fff'} containerStyle = {{marginTop : 8}} 
                    size = {25} />
                 </View>

                 <ScrollView>
                   </ScrollView>
                   <View style = {{justifyContent : "flex-end" , marginVertical : 25}}>
                 <Text style = {styles.bottomLink}>SIGN UP WIDTH</Text>
                     <View style = {{flexDirection : "row" ,width : "100%", 
                     justifyContent : "space-around" , marginVertical : 12}}>
                     <CustomButton
                  onPress = {()=> this.props.navigation.navigate('CreateAccount')}
                  containerStyle = {{width : 160}}
                  title = {'Facebook'} backgroundColor = {'blue'} />
                   <CustomButton
                  onPress = {()=> this.props.navigation.navigate('SmsCode')}
                  containerStyle = {{width : 160}}
                  title = {'Phone Number'} backgroundColor = {'skyblue'} 
                  />
                      </View>
                      <Text style = {styles.bottomLink}>OR</Text>
                      <CustomButton
                  onPress = {()=> this.props.navigation.navigate('EmailAccount')}
                  containerStyle = {{width : '90%'}}
                  title = {'EMAIL'} backgroundColor = {pinkColor} 
                  />
                  </View>

                  <TouchableOpacity 
                  onPress= {()=> this.props.navigation.navigate('SignIn')}
                  style = {{flexDirection : 'row' , height : 50}}>
                    <Text style = {{color : '#ccc' , paddingLeft : 25}}>Already Member ?<Text style = {{color : pinkColor}}>   Login</Text></Text>
                   </TouchableOpacity>
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
      buttonStyle : {width : 170 , height : 45 ,  borderRadius : 25,
        backgroundColor : '#323643' , borderColor : "#fff" , borderWidth : 0.5 ,marginHorizontal : 6},
        bottomLink : {fontSize : 12 ,  color : "#ccc" , paddingLeft : 25 , marginVertical : 12},
        line : {flex : 1, height : 0.5, borderWidth : 0.3 , borderColor : "#ccc"}
    })
    export default SignUp
 