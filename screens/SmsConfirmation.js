/* eslint-disable */

import React, { Fragment } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native'
import { Icon, Input, Button } from 'react-native-elements'
import CustomButton from '../Component/Button'
import { themeColor, pinkColor } from '../Constant/index'
import { Picker } from 'native-base'
import firebase from '../utils/firebase'
import firebaseLib from "react-native-firebase";
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';
import { loginUser } from '../redux/actions/authActions'


const auth = firebaseLib.auth()


class CodeConfirmation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'key1',
      loading: false
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

  componentDidMount() {
    let userObj = {}
    const foundedId = this.props.navigation.state.params.foundedId

    userObj = 'fuck'
    
    auth.onAuthStateChanged(async (user) => {
  if (user){
    this.setState({ loading: true })
    const dataFind = await firebase.getDocument('Users', foundedId)
        userObj = dataFind.data();
        this.props.loginUser(userObj)
        this.props.navigation.navigate('App')  
  }
  this.setState({ loading: false })
  });
}
  
  keyboardButton = (number , letters)=><TouchableOpacity style = {{height : 45 , borderRadius : 7 , 
    backgroundColor : '#5A5B5E'  , width : '31%' , justifyContent : 'center' , alignItems : 'center'}}>
      <Text style = {{color : "#fff" , fontSize : letters !== '' ? 15 : 18}}>{number}</Text> 
      {
        letters !== '' ?
      <Text style = {{color : "#fff" , fontSize : 10 , fontWeight : 'bold'}}>{letters}</Text>  
      : null
      }
  </TouchableOpacity>

  async confirmSmsCode(){
    const phoneAuthSnapshot = this.props.navigation.state.params.phoneAuthSnapshot
    // auth.onAuthStateChanged(user => {
    //   console.log('USER', user)
    //   if(user){
    //     console.log('USer ========> IFFFF' , user)
    //   }
    // })
    
    const { code } = this.state
    try{
      const confirmation = await phoneAuthSnapshot.confirm(code)
    }
    catch(e){
      alert(e.message)
      console.log('Errror ====>', e)
    }
    
    // this.props.navigation.navigate('CodeConfirmation')

  }
  async resend(){
    // const phoneNumber = this.props.navigation.state.params.phoneNumber
    // await firebase.loginWithPhoneNumber(phoneNumber)
  }
  render () {
    const { navigation, loading } = this.props
    return (
        <View style={{ backgroundColor: '#323643', flex: 1 }}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />

          <ScrollView>
        <View style={{ padding: 30, paddingLeft: 15 }}>
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
            Confirmation
          </Text>
          <Text style={{ color: '#ccc', fontSize: 15 }}>
            Please enter the verification code from the sms we just sent you.
          </Text>
        </View>   
        <Input placeholder = {'Code'}
         keyboardType = {'numeric'} placeholderTextColor = {'#fff'} 
         inputContainerStyle = {styles.inputContainer} inputStyle = {{fontWeight : 'bold' , fontSize :14}} onChangeText={(text)=> this.setState({ code: text })} />
         <View style = {{marginVertical  : 12}}>
             <CustomButton
                  onPress = {()=> this.confirmSmsCode()}
                  containerStyle = {{width : '90%'}}
                  title = {'Confirm'} backgroundColor = {pinkColor} 
                  />
         </View>
         <TouchableOpacity style = {{flexDirection : 'row'}} onPress={()=> this.resend()}>
           <Text style = {{color : '#ccc' , paddingLeft : 25}}>Don't get it ?<Text style = {{color : pinkColor}}> Resend Code</Text></Text>
         </TouchableOpacity>
                  </ScrollView>
                  {/* <View style = {{justifyContent : 'flex-end' , backgroundColor : '#000'}}>
                    <View style = {{flexDirection : 'row'  , marginTop : 5, justifyContent : 'space-around'}}>
                      {this.keyboardButton('1' , '')}
                      {this.keyboardButton('2' , 'ABC')}
                      {this.keyboardButton('3' , 'DEF')}
                       </View>
                       <View style = {{flexDirection : 'row'  , marginTop : 5, justifyContent : 'space-around'}}>
                      {this.keyboardButton('4' , 'GHI')}
                      {this.keyboardButton('5' , 'KHL')}
                      {this.keyboardButton('6' , 'MNO')}
                       </View>
                       <View style = {{flexDirection : 'row'  , marginTop : 5, justifyContent : 'space-around'}}>
                      {this.keyboardButton('7' , 'PQRS')}
                      {this.keyboardButton('8' , 'TUV')}
                      {this.keyboardButton('9' , 'WXYZ')}
                       </View>
                       <View style = {{flexDirection : 'row'  , marginTop : 5, justifyContent : 'space-around'}}>
                      {/* {this.keyboardButton('' , '')} */}
                      {/* <View style = {{width : '31%'}} />
                      {this.keyboardButton('0' , '')}
                      <TouchableOpacity style = {{height : 42 , borderRadius : 7 ,  width : '31%' , justifyContent : 'center' , alignItems : 'center'}}>
                       <Icon type = {"font-awesome5"} name = {'backspace'} color = {'#fff'} />
                      </TouchableOpacity>
                       </View>
                       <TouchableOpacity style = {{height : 42 ,  marginTop:   18, alignSelf : "flex-end" , marginRight : 25}}>
                       <Icon type = {"font-awesome"} name = {'microphone'} color = {'#fff'} size = {30} />
                      </TouchableOpacity>
                    </View> */} 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    borderColor: '#323643',
    backgroundColor: '#454B61',
    borderRadius: 7,
    paddingLeft: 12,
    marginVertical: 6
  },

  picker :{
    width: '94%',
    alignSelf: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#454B61',
    height: 50,
    borderRadius: 7
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userData) => dispatch(loginUser(userData))
  }
}
const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeConfirmation)
