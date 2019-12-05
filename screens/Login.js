import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView
} from 'react-native';
import {Icon , Input , Button} from 'react-native-elements'
 class Login extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    header: null,
};
    render() {
      const {navigation} = this.props
        return (
            <ScrollView style={{backgroundColor : '#323643'}}>
                <View style = {{height : 100 , flexDirection : 'row' , alignItems : 'center' ,
                 justifyContent : 'space-between' , marginHorizontal : 15 ,}}>
                    <Text style = {{color : '#fff' , fontSize : 25 , fontWeight : 'bold'}}>Login</Text>
                    <Icon type = {'font-awesome'} name  = {'angle-left'} color = {'#fff'} containerStyle = {{marginTop : 8}} 
                    size = {25} />
                 </View>
                 <View style = {{flex : 1 , alignItems : 'center' , marginTop : "32%"}}>
                     <Input placeholder = {'Email'} placeholderTextColor = {'#fff'} 
                     inputContainerStyle = {styles.inputContainer} inputStyle = {{fontWeight : 'bold'}} />

                     <Input placeholder = {'Password'} secureTextEntry = {true} placeholderTextColor = {'#fff'} 
                     inputContainerStyle = {styles.inputContainer} inputStyle = {{fontWeight : 'bold'}} />

                     <View style = {{flexDirection : "row" , justifyContent : "center" , marginVertical : 12}}>
                         <Button onPress = {()=> this.props.navigation.navigate('App')} title = {'Login'} buttonStyle = {styles.buttonStyle} />
                         <Button title = {'Sign Up'} buttonStyle = {[styles.buttonStyle , {backgroundColor : "#FD7496" , borderWidth : 0}]} />
                      </View>

                      <View style = {{flexDirection : "row" , width : "95%" ,
                       alignItems  : "center" , marginVertical : 15 }}>
                          <View style = {styles.line} />
                          <Text style = {{marginHorizontal : 12 , color : "#ccc" , fontSize : 18}}>OR</Text>
                          <View style = {styles.line} />
                          </View>
                         <Button title = {'Facebook'} 
                         buttonStyle = {{width : 300 , height : 50 , borderRadius : 25}} />
                     </View>
                     <View style = {{paddingLeft : 12}}>
                       <TouchableOpacity onPress = {()=> this.props.navigation.navigate("CreateAccount")} style = {{height : 30 , justifyContent : "center"}}>
                         <Text style = {styles.bottomLink}>Need An Account ?<Text style = {{color : '#FD7496' }}>  Sign Up</Text></Text>
                         </TouchableOpacity>
                       <TouchableOpacity onPress = {()=> this.props.navigation.navigate("ForgotPassword")} style = {{height : 30 , justifyContent : "center"}}>
                         <Text style = { [styles.bottomLink ,{marginVertical : 12} ]}>Forget Your Password ?<Text style = {{color : '#FD7496' }}>  Retrive</Text></Text>
                         </TouchableOpacity>
                     </View>

          </ScrollView>
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
    export default Login
 